# Supabase 永久记忆配置

1. 在 Supabase 新建项目，打开 **SQL Editor**，执行 `docs/supabase-schema.sql`。
2. 在 **Project Settings → API** 复制 Project URL 与 `anon public` key。
3. 编辑 `assets/cloud-config.js`，按文件中的示例填入这两个公开值。
4. 不要把 `service_role` key 放进纯前端网站。

配置后，留言会跨设备共享；角色互动会以只追加事件保存。访客不能通过网页读取、修改或删除行为记录。浏览器仍保留 IndexedDB 与 localStorage 双重后备，网络短暂中断不会影响当前设备上的使用。
