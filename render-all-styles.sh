#!/bin/bash

# 批量渲染所有样式的脚本
# 生成前5秒的测试视频

# 创建输出目录
mkdir -p rendered-outputs

# 所有样式的ID列表
styles=(
  "CaptionedVideo"
  "NeonGlowStyle"  
  "RetroWaveStyle"
  "GlitchStyle"
  "MinimalStyle"
  "GlassmorphismStyle"
  "GradientRainbowStyle"
  "CartoonBubbleStyle"
  "MetallicStyle"
  "NeonBorderStyle"
  "PixelArtStyle"
  "ElegantShadowStyle"
  "Embossed3DStyle"
  "FluidGradientStyle"
  "TechWireframeStyle"
  "BouncyBallStyle"
  "SpinSpiralStyle"
  "ElasticZoomStyle"
  "SwayBeatStyle"
  "ShakeImpactStyle"
  "FireFlameStyle"
  "WaterRippleStyle"
  "ElectricLightningStyle"
  "SmokeMistStyle"
  "StarryParticleStyle"
)

echo "开始批量渲染 ${#styles[@]} 个样式..."

# 遍历每个样式进行渲染
for style in "${styles[@]}"; do
  echo "正在渲染: $style"
  
  # 渲染前5秒 (150帧，30fps)
  npx remotion render src/index.ts "$style" "rendered-outputs/${style}.mp4" \
    --frames=0-149 \
    --overwrite \
    --concurrency=1
  
  if [ $? -eq 0 ]; then
    echo "✅ $style 渲染完成"
  else
    echo "❌ $style 渲染失败"
  fi
  
  echo "---"
done

echo "🎉 批量渲染完成！输出文件位于 rendered-outputs/ 目录"