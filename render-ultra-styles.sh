#!/bin/bash

echo "🚀 开始渲染10个超级炫酷字幕样式..."

# 创建输出目录
mkdir -p ultra-rendered-outputs

# 超级炫酷样式列表
styles=(
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

# 渲染每个样式
for style in "${styles[@]}"; do
  echo "📹 渲染 $style..."
  npx remotion render src/index.ts "$style" "ultra-rendered-outputs/$style.mp4"
  if [ $? -eq 0 ]; then
    echo "✅ $style 渲染完成!"
  else
    echo "❌ $style 渲染失败!"
  fi
  echo ""
done

echo "🎉 所有超级炫酷样式渲染完成!"
echo "📁 输出目录: ultra-rendered-outputs/"
ls -la ultra-rendered-outputs/