# Remotion 视频渲染优化配置指南

## 问题描述

浏览器预览中动画丝滑流畅，但批量渲染后的视频出现抖动现象。

## 根本原因

**并发渲染 (concurrency) 导致帧间不一致**，产生动画抖动。

## 解决方案配置

### 1. 修改 `remotion.config.ts`

```typescript
// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");  // 更高质量的图像格式
Config.setOverwriteOutput(true);
Config.setConcurrency(1); // 🔑 关键配置：避免并发造成的不一致
```

### 2. 修改所有Composition的帧率（可选）

在 `src/Root.tsx` 中，为所有 `<Composition>` 添加 `fps={60}`：

```typescript
<Composition
  id="NeonGlowStyle"
  component={NeonGlowVideo}
  calculateMetadata={calculateNeonGlowVideoMetadata}
  schema={neonGlowVideoSchema}
  width={1080}
  height={1920}
  fps={60}  // 🔑 提升到60fps（可选）
  defaultProps={{
    src: staticFile("sample-video.mp4"),
  }}
/>
```

### 3. 批量渲染脚本配置

在批量渲染脚本中使用以下参数：

```javascript
execSync(
  `npx remotion render src/index.ts ${style} "${outputPath}" --props='{"src":"${relativeVideoPath}"}' --overwrite --crf=15 --codec=h264 --audio-codec=aac --video-image-format=png --concurrency=1`,
  // 关键参数说明：
  // --crf=15          # 更高的视频质量（可选）
  // --video-image-format=png  # 无损图像格式（可选）
  // --concurrency=1   # 🔑 关键：单线程渲染，避免抖动
);
```

## 参数重要性排序

根据实际测试结果：

| 优先级 | 参数 | 作用 | 是否必需 |
|--------|------|------|----------|
| 🔴 **最高** | `--concurrency=1` | 解决抖动问题 | ✅ **必须** |
| 🟡 中等 | `--crf=15` | 提升视频质量 | ⚪ 可选 |
| 🟡 中等 | `--video-image-format=png` | 提升图像质量 | ⚪ 可选 |
| 🟢 低 | `fps={60}` | 提升帧率流畅度 | ⚪ 可选 |

## 测试验证方法

### 创建测试脚本

```bash
# 测试1: 默认设置（可能有抖动）
npx remotion render src/index.ts NeonGlowStyle test-default.mp4 --props='{"src":"public/sample-video.mp4"}' --overwrite

# 测试2: 修复后设置（应该流畅）
npx remotion render src/index.ts NeonGlowStyle test-fixed.mp4 --props='{"src":"public/sample-video.mp4"}' --overwrite --concurrency=1

# 比较两个视频的动画流畅度
```

### 验证步骤

1. 播放两个测试视频
2. 重点观察字幕动画的流畅度
3. `test-fixed.mp4` 应该和浏览器预览一样流畅
4. `test-default.mp4` 可能会有轻微抖动

## 部署到其他服务器

### 1. 确保依赖安装

```bash
npm install
```

### 2. 复制配置文件

将以下文件复制到新服务器：

- `remotion.config.ts` （包含 setConcurrency(1) 配置）
- `src/Root.tsx` （如果修改了fps设置）
- 批量渲染脚本（包含 --concurrency=1 参数）

### 3. 验证配置

```bash
# 检查配置是否生效
npx remotion compositions src/index.ts

# 应该看到concurrency相关的输出显示为1
```

## 技术原理

### 为什么并发渲染会导致抖动？

1. **帧间不一致**：多线程同时渲染不同帧时，动画状态可能存在细微差异
2. **时间戳精度**：并发渲染可能影响动画时间计算的精确性
3. **内存竞争**：多线程访问共享资源时产生的细微延迟

### 为什么单线程渲染能解决？

- **帧间一致性**：按顺序渲染每一帧，确保动画状态连续
- **时间精确性**：单线程环境下时间计算更精确
- **资源独占**：避免内存和计算资源的竞争

## 性能权衡

| 方面 | 单线程渲染 | 多线程渲染 |
|------|-----------|-----------|
| **动画质量** | ✅ 完美流畅 | ❌ 可能抖动 |
| **渲染速度** | ⚪ 较慢 | ✅ 更快 |
| **CPU利用率** | ⚪ 较低 | ✅ 更高 |
| **内存使用** | ✅ 稳定 | ⚪ 波动 |

**结论：对于复杂动画，质量比速度更重要。**

## 常见问题

### Q: 为什么浏览器预览没问题？
A: 浏览器使用实时渲染和GPU加速，不存在帧间不一致问题。

### Q: 能否保持多线程但避免抖动？
A: 对于复杂动画，建议使用单线程。简单静态内容可以考虑多线程。

### Q: 其他视频编码器是否有同样问题？
A: 这是渲染阶段的问题，与最终编码器无关。

## 版本兼容性

此配置适用于：
- Remotion v4.0.0+
- Node.js 18+
- 所有主流操作系统（macOS, Linux, Windows）

---

**最后更新：** 2025年1月
**测试环境：** macOS 15.0, Remotion 4.0.0, Node.js 20.x