import bpy
import math
import random
from mathutils import Vector
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
GLB_PATH = ASSETS / "lumi-character.glb"
PREVIEW_PATH = ASSETS / "lumi-blender-preview.png"
random.seed(520)


def material(name, color, roughness=0.5, metallic=0.0, coat=0.0, emission=None):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color[:3], color[3])
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if "Coat Weight" in bsdf.inputs:
        bsdf.inputs["Coat Weight"].default_value = coat
    if emission:
        bsdf.inputs["Emission Color"].default_value = emission
        bsdf.inputs["Emission Strength"].default_value = 1.2
    return mat


def smooth(obj):
    if obj.type == "MESH":
        for polygon in obj.data.polygons:
            polygon.use_smooth = True


def uv_sphere(name, location, scale, mat, segments=48, rings=32, parent=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    smooth(obj)
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent
    return obj


def empty(name, location=(0, 0, 0), parent=None):
    obj = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(obj)
    obj.empty_display_type = "PLAIN_AXES"
    obj.location = location
    obj.parent = parent
    return obj


def curve_tube(name, points, bevel, mat, parent=None):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 3
    curve.bevel_depth = bevel
    curve.bevel_resolution = 4
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for point, coordinate in zip(spline.bezier_points, points):
        point.co = coordinate
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    obj.parent = parent
    return obj


def create_fur(parent, mat):
    vertices = []
    faces = []
    count = 1180
    golden = math.pi * (3.0 - math.sqrt(5.0))
    axes = Vector((1.08, 0.91, 1.02))
    center = Vector((0, 0.03, 0.42))
    for index in range(count):
        y_unit = 1.0 - (2.0 * (index + 0.5) / count)
        radius = math.sqrt(max(0.0, 1.0 - y_unit * y_unit))
        angle = golden * index
        unit = Vector((math.cos(angle) * radius, math.sin(angle) * radius, y_unit))
        surface = center + Vector((unit.x * axes.x, unit.y * axes.y, unit.z * axes.z))
        normal = Vector((unit.x / axes.x, unit.y / axes.y, unit.z / axes.z)).normalized()
        # Keep the facial centre neat while preserving soft, short facial fur.
        face_zone = unit.y < -0.58 and abs(unit.x) < 0.62 and -0.28 < unit.z < 0.55
        crown_lift = 1.35 if unit.z > 0.72 else 1.0
        length = random.uniform(0.026, 0.067) * crown_lift * (0.42 if face_zone else 1.0)
        base_radius = random.uniform(0.009, 0.017) * (0.65 if face_zone else 1.0)
        tangent = normal.cross(Vector((0, 0, 1)))
        if tangent.length < 0.1:
            tangent = normal.cross(Vector((0, 1, 0)))
        tangent.normalize()
        bitangent = normal.cross(tangent).normalized()
        base = surface + normal * 0.012
        start = len(vertices)
        sides = 4
        for side in range(sides):
            a = math.tau * side / sides
            jitter = 0.82 + random.random() * 0.3
            vertices.append(base + (tangent * math.cos(a) + bitangent * math.sin(a)) * base_radius * jitter)
        lean = tangent * random.uniform(-0.018, 0.018) + bitangent * random.uniform(-0.018, 0.018)
        vertices.append(base + normal * length + lean)
        tip = start + sides
        for side in range(sides):
            faces.append((start + side, start + (side + 1) % sides, tip))
    mesh = bpy.data.meshes.new("LumiFurMesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    fur = bpy.data.objects.new("Fur", mesh)
    bpy.context.collection.objects.link(fur)
    fur.data.materials.append(mat)
    fur.parent = parent
    return fur


def heart_mesh(name, mat, parent):
    points = []
    for i in range(64):
        t = math.tau * i / 64
        x = 16 * math.sin(t) ** 3
        z = 13 * math.cos(t) - 5 * math.cos(2*t) - 2 * math.cos(3*t) - math.cos(4*t)
        points.append((x * 0.018, -0.02, z * 0.018))
    vertices = [(x, y - 0.035, z) for x, y, z in points] + [(x, y + 0.035, z) for x, y, z in points]
    faces = []
    n = len(points)
    faces.append(tuple(range(n - 1, -1, -1)))
    faces.append(tuple(range(n, 2*n)))
    for i in range(n):
        j = (i + 1) % n
        faces.append((i, j, n+j, n+i))
    mesh = bpy.data.meshes.new(name + "Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    obj.parent = parent
    obj.location = (0, -1.18, 1.12)
    obj.rotation_euler.x = math.radians(90)
    obj.scale = (0.001, 0.001, 0.001)
    return obj


def main():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    ASSETS.mkdir(parents=True, exist_ok=True)

    pink = material("Lumi coral fur", (0.92, 0.155, 0.36, 1), 0.72, coat=0.12)
    fur_pink = material("Lumi rose fibre", (1.0, 0.22, 0.46, 1), 0.86)
    paw_pink = material("Warm paw", (1.0, 0.34, 0.5, 1), 0.62, coat=0.18)
    iris = material("Rose iris", (0.19, 0.025, 0.065, 1), 0.08, metallic=0.05, coat=1.0)
    pupil_mat = material("Deep pupil", (0.006, 0.002, 0.008, 1), 0.025, coat=1.0)
    eye_rim = material("Soft eye rim", (0.34, 0.07, 0.13, 1), 0.22, coat=0.65)
    shine = material("Eye sparkle", (1.0, 0.93, 0.95, 1), 0.03, coat=1.0, emission=(1.0, 0.68, 0.78, 1))
    nose_mat = material("Tiny nose", (0.12, 0.012, 0.035, 1), 0.16, coat=0.9)
    blush_mat = material("Blush", (1.0, 0.08, 0.28, 0.5), 0.55)
    heart_mat = material("Heart glow", (1.0, 0.035, 0.27, 1), 0.25, coat=0.5, emission=(1.0, 0.02, 0.18, 1))

    root = empty("LumiRoot", (0, 0, 0))
    character = empty("Character", (0, 0, 0), root)

    body = uv_sphere("Body", (0, 0.03, 0.42), (1.08, 0.91, 1.02), pink, 64, 48, character)
    bevel = body.modifiers.new("Velvet surface", "DISPLACE")
    texture = bpy.data.textures.new("Micro fur noise", type="CLOUDS")
    texture.noise_scale = 0.16
    texture.noise_depth = 1
    bevel.texture = texture
    bevel.strength = 0.022
    bevel.mid_level = 0.52
    create_fur(character, fur_pink)

    # Eyes: layered rose glass with two highlights, matching the static illustration.
    for x, side in ((-0.37, "L"), (0.37, "R")):
        eye = empty(f"Eye.{side}", (x, -0.785, 0.64), character)
        uv_sphere(f"EyeRim.{side}", (0, 0, 0), (0.315, 0.105, 0.39), eye_rim, 48, 32, eye)
        uv_sphere(f"Iris.{side}", (0, -0.085, -0.012), (0.265, 0.08, 0.335), iris, 48, 32, eye)
        pupil = uv_sphere(f"Pupil.{side}", (0, -0.14, -0.025), (0.18, 0.045, 0.255), pupil_mat, 40, 28, eye)
        pupil["characterPart"] = True
        uv_sphere(f"SparkleBig.{side}", (-0.07, -0.183, 0.11), (0.058, 0.018, 0.074), shine, 24, 16, eye)
        uv_sphere(f"SparkleSmall.{side}", (0.07, -0.186, -0.105), (0.025, 0.012, 0.032), shine, 20, 12, eye)

    # Tiny triangular nose.
    bpy.ops.mesh.primitive_cone_add(vertices=3, radius1=0.095, radius2=0.0, depth=0.075, location=(0, -0.92, 0.31), rotation=(math.radians(90), 0, math.radians(30)))
    nose = bpy.context.object
    nose.name = "Nose"
    nose.scale = (1.0, 0.72, 0.65)
    nose.data.materials.append(nose_mat)
    nose.parent = character
    smooth(nose)
    curve_tube("Mouth.L", [(0, -0.956, 0.27), (-0.035, -0.962, 0.225), (-0.11, -0.943, 0.22)], 0.011, nose_mat, character)
    curve_tube("Mouth.R", [(0, -0.956, 0.27), (0.035, -0.962, 0.225), (0.11, -0.943, 0.22)], 0.011, nose_mat, character)

    for x, side in ((-0.65, "L"), (0.65, "R")):
        cheek = uv_sphere(f"Blush.{side}", (x, -0.84, 0.23), (0.18, 0.025, 0.09), blush_mat, 28, 18, character)
        cheek["characterPart"] = True

    # Front paws have their pivots at the shoulder, so waves feel soft rather than mechanical.
    arms = []
    for x, side, angle in ((-0.43, "L", -8), (0.43, "R", 8)):
        arm = empty(f"Arm.{side}", (x, -0.43, 0.23), character)
        paw = uv_sphere(f"Paw.{side}", (0, -0.44, -0.3), (0.21, 0.16, 0.27), paw_pink, 40, 28, arm)
        paw.rotation_euler.y = math.radians(angle)
        for claw_x in (-0.09, 0, 0.09):
            curve_tube(f"Toe.{side}.{claw_x}", [(claw_x, -0.64, -0.22), (claw_x * 1.05, -0.655, -0.29)], 0.008, eye_rim, arm)
        arms.append(arm)

    for x, side in ((-0.5, "L"), (0.5, "R")):
        foot = uv_sphere(f"Foot.{side}", (x, -0.16, -0.49), (0.38, 0.48, 0.24), paw_pink, 40, 28, character)
        foot.rotation_euler.x = math.radians(-7)

    heart_mesh("Heart", heart_mat, character)

    for obj in character.children_recursive:
        obj["characterPart"] = True

    # Studio render setup, excluded from the web GLB export.
    ground_mat = material("Ground", (0.025, 0.008, 0.035, 1), 0.36, metallic=0.15)
    bpy.ops.mesh.primitive_plane_add(size=30, location=(0, 0, -0.74))
    ground = bpy.context.object
    ground.data.materials.append(ground_mat)
    bevel_ground = ground.modifiers.new("Soft ground", "BEVEL")
    bevel_ground.width = 0.2

    world = bpy.context.scene.world or bpy.data.worlds.new("World")
    bpy.context.scene.world = world
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.012, 0.004, 0.025, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.18

    def area(name, location, energy, color, size):
        data = bpy.data.lights.new(name, "AREA")
        data.energy = energy
        data.color = color
        data.shape = "DISK"
        data.size = size
        obj = bpy.data.objects.new(name, data)
        bpy.context.collection.objects.link(obj)
        obj.location = location
        direction = Vector((0, 0, 0.35)) - obj.location
        obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
        return obj

    area("Warm key", (-3.5, -4.4, 5.2), 1050, (1.0, 0.55, 0.68), 4.2)
    area("Cool fill", (3.5, -1.5, 2.0), 720, (0.42, 0.28, 1.0), 3.4)
    area("Pink rim", (2.2, 3.4, 4.5), 1400, (1.0, 0.08, 0.35), 3.0)

    camera_data = bpy.data.cameras.new("PreviewCamera")
    camera = bpy.data.objects.new("PreviewCamera", camera_data)
    bpy.context.collection.objects.link(camera)
    camera.location = (3.1, -6.5, 2.25)
    direction = Vector((0, 0, 0.38)) - camera.location
    camera.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    camera_data.lens = 58
    bpy.context.scene.camera = camera

    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 900
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = str(PREVIEW_PATH)
    scene.render.film_transparent = False
    scene.render.image_settings.color_mode = "RGBA"
    scene.view_settings.look = "AgX - Medium High Contrast"
    bpy.ops.render.render(write_still=True)

    bpy.ops.object.select_all(action="DESELECT")
    root.select_set(True)
    for obj in root.children_recursive:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = root
    bpy.ops.export_scene.gltf(
        filepath=str(GLB_PATH),
        export_format="GLB",
        use_selection=True,
        export_yup=True,
        export_apply=True,
        export_animations=False,
        export_cameras=False,
        export_lights=False,
    )
    print(f"LUMI GLB: {GLB_PATH}")
    print(f"LUMI preview: {PREVIEW_PATH}")


if __name__ == "__main__":
    main()
