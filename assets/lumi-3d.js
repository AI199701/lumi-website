import * as THREE from "./vendor/three.module.min.js";

const ACTION_UNLOCKS = { bounce: 0, wave: 20, spin: 40, dance: 60, heart: 80 };
const ACTION_DURATIONS = { bounce: 1.35, wave: 1.9, spin: 1.55, dance: 3.1, heart: 2.8, bow: 1.7 };
const instances = [];

function easeOutBack(value) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * ((value - 1) ** 3) + c1 * ((value - 1) ** 2);
}

function createHeartGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.55);
  shape.bezierCurveTo(-1.15, -0.05, -1.05, 0.9, -0.42, 0.9);
  shape.bezierCurveTo(-0.08, 0.9, 0, 0.6, 0, 0.42);
  shape.bezierCurveTo(0, 0.6, 0.08, 0.9, 0.42, 0.9);
  shape.bezierCurveTo(1.05, 0.9, 1.15, -0.05, 0, -0.55);
  return new THREE.ShapeGeometry(shape, 18);
}

class LumiCharacter {
  constructor(container) {
    this.container = container;
    this.mode = container.dataset.lumiMode || "memory";
    this.affection = Math.min(100, Number(localStorage.getItem("lumi-affection") || 0));
    this.habits = JSON.parse(localStorage.getItem("lumi-interaction-habits") || "{}");
    this.pointer = new THREE.Vector2(0, 0);
    this.targetPointer = new THREE.Vector2(0, 0);
    this.raycaster = new THREE.Raycaster();
    this.startedAt = performance.now();
    this.elapsedTime = 0;
    this.currentAction = null;
    this.actionStartedAt = 0;
    this.nextAutoAction = 5 + Math.random() * 4;
    this.nextBlink = 2.4 + Math.random() * 2;
    this.blinkStartedAt = -10;
    this.ready = false;

    try {
      this.setupScene();
      this.createCharacter();
      this.bindInteractions();
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(container);
      this.resize();
      this.renderer.setAnimationLoop(() => this.render());
      container.classList.add("three-ready");
      container.closest(".memory-dialog, .finale")?.classList.add("has-3d");
      this.ready = true;
    } catch (error) {
      console.warn("WebGL character could not start; keeping the accessible 2D interaction fallback.", error);
      container.classList.add("three-fallback");
    }
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    this.camera.position.set(0, 0.55, this.mode === "finale" ? 6.8 : 6.25);
    this.camera.lookAt(0, 0.45, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.16;
    this.renderer.domElement.tabIndex = 0;
    this.renderer.domElement.setAttribute("role", "button");
    this.renderer.domElement.setAttribute("aria-label", "点击与 3D LUMI 互动");
    this.container.append(this.renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xffd9e8, 0x21152c, 2.2);
    this.scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff2e6, 4.5);
    key.position.set(-3, 5, 5);
    this.scene.add(key);
    const rim = new THREE.PointLight(0xff4d99, 20, 12, 2);
    rim.position.set(3.5, 2.4, 1);
    this.scene.add(rim);
    const fill = new THREE.PointLight(0x7777ff, 8, 10, 2);
    fill.position.set(-3, 0, 2);
    this.scene.add(fill);
  }

  createCharacter() {
    const pink = new THREE.MeshStandardMaterial({ color: 0xf7689c, roughness: 0.84, metalness: 0.02 });
    const pinkLight = new THREE.MeshStandardMaterial({ color: 0xff8bb3, roughness: 0.78 });
    const dark = new THREE.MeshPhysicalMaterial({ color: 0x160c19, roughness: 0.05, metalness: 0.08, clearcoat: 1 });
    const eyeWhite = new THREE.MeshPhysicalMaterial({ color: 0xfff8f3, roughness: 0.18, clearcoat: 0.65 });
    const blush = new THREE.MeshBasicMaterial({ color: 0xff4d82, transparent: true, opacity: 0.48 });

    this.root = new THREE.Group();
    this.root.position.y = 0.05;
    this.scene.add(this.root);

    this.character = new THREE.Group();
    this.root.add(this.character);

    this.body = new THREE.Mesh(new THREE.SphereGeometry(1.08, 64, 48), pink);
    this.body.scale.set(1, 0.94, 0.88);
    this.body.position.y = 0.45;
    this.body.userData.characterPart = true;
    this.character.add(this.body);

    const furPositions = [];
    const furColors = [];
    const color = new THREE.Color();
    for (let index = 0; index < 1800; index += 1) {
      const u = Math.random();
      const v = Math.random();
      const theta = Math.PI * 2 * u;
      const phi = Math.acos(2 * v - 1);
      const radius = 1.07 + Math.random() * 0.07;
      const sinPhi = Math.sin(phi);
      furPositions.push(radius * sinPhi * Math.cos(theta), 0.45 + radius * 0.94 * Math.cos(phi), radius * 0.88 * sinPhi * Math.sin(theta));
      color.setHSL(0.94 + Math.random() * 0.025, 0.74, 0.62 + Math.random() * 0.13);
      furColors.push(color.r, color.g, color.b);
    }
    const furGeometry = new THREE.BufferGeometry();
    furGeometry.setAttribute("position", new THREE.Float32BufferAttribute(furPositions, 3));
    furGeometry.setAttribute("color", new THREE.Float32BufferAttribute(furColors, 3));
    this.fur = new THREE.Points(furGeometry, new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.86, depthWrite: false }));
    this.fur.userData.characterPart = true;
    this.character.add(this.fur);

    this.eyeGroups = [];
    this.pupils = [];
    [-0.36, 0.36].forEach((x) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(x, 0.72, 0.79);
      const white = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 24), eyeWhite);
      white.scale.set(0.9, 1.12, 0.38);
      white.userData.characterPart = true;
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.17, 32, 24), dark);
      pupil.position.set(0, -0.01, 0.235);
      pupil.scale.set(0.84, 1.12, 0.48);
      pupil.userData.characterPart = true;
      const sparkle = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 12), eyeWhite);
      sparkle.position.set(-0.045, 0.065, 0.37);
      eyeGroup.add(white, pupil, sparkle);
      this.character.add(eyeGroup);
      this.eyeGroups.push(eyeGroup);
      this.pupils.push(pupil);
    });

    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 18), dark);
    nose.scale.set(1.1, 0.7, 0.7);
    nose.position.set(0, 0.38, 0.91);
    nose.userData.characterPart = true;
    this.character.add(nose);

    [-0.58, 0.58].forEach((x) => {
      const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), blush);
      cheek.scale.set(1, 0.48, 0.2);
      cheek.position.set(x, 0.31, 0.81);
      this.character.add(cheek);
    });

    this.leftArm = new THREE.Group();
    this.rightArm = new THREE.Group();
    [[this.leftArm, -0.86], [this.rightArm, 0.86]].forEach(([arm, x]) => {
      arm.position.set(x, 0.31, 0.23);
      const paw = new THREE.Mesh(new THREE.SphereGeometry(0.29, 30, 22), pinkLight);
      paw.scale.set(0.78, 1.1, 0.72);
      paw.position.y = -0.2;
      paw.userData.characterPart = true;
      arm.add(paw);
      this.character.add(arm);
    });

    this.feet = [];
    [-0.48, 0.48].forEach((x) => {
      const foot = new THREE.Mesh(new THREE.SphereGeometry(0.31, 30, 22), pinkLight);
      foot.scale.set(1.15, 0.68, 1.15);
      foot.position.set(x, -0.38, 0.5);
      foot.userData.characterPart = true;
      this.character.add(foot);
      this.feet.push(foot);
    });

    this.heart = new THREE.Mesh(createHeartGeometry(), new THREE.MeshBasicMaterial({ color: 0xff4f94, transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
    this.heart.position.set(0, 0.55, 1.48);
    this.heart.scale.setScalar(0.001);
    this.character.add(this.heart);

    const shadow = new THREE.Mesh(new THREE.CircleGeometry(1.28, 48), new THREE.MeshBasicMaterial({ color: 0x09060b, transparent: true, opacity: 0.32, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -0.68, 0.15);
    this.scene.add(shadow);
  }

  bindInteractions() {
    const canvas = this.renderer.domElement;
    canvas.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      this.targetPointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -(((event.clientY - rect.top) / rect.height) * 2 - 1));
    });
    canvas.addEventListener("pointerleave", () => this.targetPointer.set(0, 0));
    canvas.addEventListener("pointerdown", (event) => this.handleTap(event));
    canvas.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.handleTap({ clientX: undefined, clientY: undefined });
      }
    });
  }

  handleTap(event) {
    if (Number.isFinite(event.clientX)) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      const pointer = new THREE.Vector2(((event.clientX - rect.left) / rect.width) * 2 - 1, -(((event.clientY - rect.top) / rect.height) * 2 - 1));
      this.raycaster.setFromCamera(pointer, this.camera);
      if (!this.raycaster.intersectObjects(this.character.children, true).some((hit) => hit.object.userData.characterPart)) return;
    }
    const action = this.bestUnlockedAction();
    this.play(action);
    window.dispatchEvent(new CustomEvent("lumi:character-tap", { detail: { action, clientX: event.clientX, clientY: event.clientY, mode: this.mode } }));
  }

  bestUnlockedAction() {
    const unlocked = Object.entries(ACTION_UNLOCKS).filter(([, value]) => this.affection >= value).map(([name]) => name);
    const preferred = this.habits.preferredAction;
    if (unlocked.includes(preferred) && Math.random() < 0.62) return preferred;
    return unlocked[Math.floor(Math.random() * unlocked.length)] || "bounce";
  }

  play(action) {
    if (ACTION_UNLOCKS[action] > this.affection) return;
    this.currentAction = action;
    this.actionStartedAt = this.elapsedTime;
  }

  resetPose() {
    this.root.position.set(0, 0.05, 0);
    this.character.rotation.set(0, 0, 0);
    this.leftArm.rotation.set(0, 0, -0.16);
    this.rightArm.rotation.set(0, 0, 0.16);
    this.feet[0].rotation.set(0, 0, 0);
    this.feet[1].rotation.set(0, 0, 0);
    this.heart.scale.setScalar(0.001);
    this.heart.material.opacity = 0.9;
  }

  applyAction(elapsed) {
    if (!this.currentAction) return;
    const duration = ACTION_DURATIONS[this.currentAction] || 1.5;
    const progress = Math.min(1, (elapsed - this.actionStartedAt) / duration);
    const wave = Math.sin(progress * Math.PI);
    switch (this.currentAction) {
      case "bounce":
        this.root.position.y += Math.abs(Math.sin(progress * Math.PI * 2)) * 0.55;
        this.character.scale.set(1 + wave * 0.05, 1 - wave * 0.04, 1 + wave * 0.05);
        break;
      case "wave":
        this.rightArm.rotation.z = -0.65 - Math.sin(progress * Math.PI * 7) * 0.48;
        this.rightArm.rotation.x = -0.32;
        this.character.rotation.z = -0.05 * wave;
        break;
      case "spin":
        this.character.rotation.y = easeOutBack(progress) * Math.PI * 2;
        this.root.position.y += wave * 0.18;
        break;
      case "dance":
        this.root.position.x = Math.sin(progress * Math.PI * 6) * 0.34;
        this.root.position.y += Math.abs(Math.sin(progress * Math.PI * 6)) * 0.22;
        this.character.rotation.z = Math.sin(progress * Math.PI * 6) * 0.16;
        this.leftArm.rotation.z = -0.8 + Math.sin(progress * Math.PI * 6) * 0.35;
        this.rightArm.rotation.z = 0.8 - Math.sin(progress * Math.PI * 6) * 0.35;
        break;
      case "heart": {
        const pop = Math.min(1, progress * 5) * (1 - Math.max(0, progress - 0.7) / 0.3);
        this.heart.scale.setScalar(Math.max(0.001, easeOutBack(Math.min(1, pop)) * 0.48));
        this.heart.position.y = 0.55 + wave * 0.38;
        this.leftArm.rotation.z = -0.78 * wave;
        this.rightArm.rotation.z = 0.78 * wave;
        break;
      }
      case "bow":
        this.character.rotation.x = wave * 0.42;
        this.character.position.z = wave * 0.15;
        break;
    }
    if (progress >= 1) {
      this.currentAction = null;
      this.character.scale.set(1, 1, 1);
      this.character.position.set(0, 0, 0);
      this.nextAutoAction = elapsed + 4.5 + Math.random() * 5;
    }
  }

  updateEyes(elapsed) {
    if (elapsed > this.nextBlink) {
      this.blinkStartedAt = elapsed;
      this.nextBlink = elapsed + 2.8 + Math.random() * 3.6;
    }
    const blinkProgress = (elapsed - this.blinkStartedAt) / 0.18;
    const blinkScale = blinkProgress >= 0 && blinkProgress <= 1 ? Math.max(0.08, Math.abs(blinkProgress - 0.5) * 2) : 1;
    this.eyeGroups.forEach((eye) => { eye.scale.y = blinkScale; });
    this.pupils.forEach((pupil) => {
      pupil.position.x = this.pointer.x * 0.035;
      pupil.position.y = -0.01 + this.pointer.y * 0.035;
    });
  }

  render() {
    if (!this.ready) return;
    const elapsed = (performance.now() - this.startedAt) / 1000;
    this.elapsedTime = elapsed;
    this.pointer.lerp(this.targetPointer, 0.075);
    this.resetPose();
    const breath = Math.sin(elapsed * 2.2) * 0.018;
    this.body.scale.set(1 - breath * 0.4, 0.94 + breath, 0.88 - breath * 0.3);
    this.fur.scale.set(1 - breath * 0.25, 1 + breath, 1 - breath * 0.2);
    this.character.rotation.y += this.pointer.x * 0.18;
    this.character.rotation.x += this.pointer.y * 0.05;
    this.updateEyes(elapsed);
    this.applyAction(elapsed);

    if (!this.currentAction && elapsed > this.nextAutoAction) {
      this.play(this.bestUnlockedAction());
      this.nextAutoAction = elapsed + 6 + Math.random() * 6;
    }
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }
}

document.querySelectorAll(".lumi-3d").forEach((container) => instances.push(new LumiCharacter(container)));

window.addEventListener("lumi:affection", (event) => {
  instances.forEach((instance) => {
    instance.affection = event.detail.value;
    instance.habits = event.detail.habits || instance.habits;
    instance.play(instance.bestUnlockedAction());
  });
});

window.addEventListener("lumi:action-request", (event) => {
  instances.filter((instance) => instance.mode === "memory").forEach((instance) => {
    instance.habits = event.detail.habits || instance.habits;
    instance.play(event.detail.action);
  });
});

window.addEventListener("lumi:memory-open", (event) => {
  instances.filter((instance) => instance.mode === "memory").forEach((instance) => {
    instance.affection = event.detail.affection;
    instance.habits = event.detail.habits || instance.habits;
    instance.play("bow");
    instance.resize();
  });
});
