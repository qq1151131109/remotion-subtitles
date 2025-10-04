#!/bin/bash

# 测试所有字幕样式
# 使用默认的 sample-video.mp4 (竖屏 1080x1920)

OUTPUT_DIR="test-outputs"
mkdir -p "$OUTPUT_DIR"

# 根据错误信息中的实际composition名称列表
STYLES=(
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
  "QuantumTeleportStyle"
  "HologramStyle"
  "MagicSpellStyle"
  "CyberpunkHackerStyle"
  "CosmicGalaxyStyle"
  "SpaceTimeWarpStyle"
  "DiamondCrystalStyle"
  "AudioWaveStyle"
  "LiquidMetalStyle"
  "RainbowAuroraStyle"
)

echo "开始渲染 ${#STYLES[@]} 个字幕样式..."
echo "输出目录: $OUTPUT_DIR"
echo ""

TOTAL=${#STYLES[@]}
CURRENT=0

for style in "${STYLES[@]}"; do
  CURRENT=$((CURRENT + 1))
  OUTPUT_FILE="$OUTPUT_DIR/${style}.mp4"
  
  echo "[$CURRENT/$TOTAL] 正在渲染: $style"
  
  # 不传props,使用defaultProps中的staticFile配置
  npx remotion render "$style" "$OUTPUT_FILE" --codec=h264 > /dev/null 2>&1
  
  if [ $? -eq 0 ] && [ -f "$OUTPUT_FILE" ]; then
    FILE_SIZE=$(ls -lh "$OUTPUT_FILE" | awk '{print $5}')
    echo "✅ $style 渲染完成 ($FILE_SIZE)"
  else
    echo "❌ $style 渲染失败"
  fi
done

echo ""
echo "全部完成!"
echo "测试视频保存在: $OUTPUT_DIR/"
ls -lh "$OUTPUT_DIR/" | tail -n +2 | awk '{print $9, $5}'
