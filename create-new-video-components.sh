#!/bin/bash

# 新样式名称列表
styles=(
  "MagicSpellVideo"
  "CyberpunkHackerVideo"
  "CosmicGalaxyVideo"
  "SpaceTimeWarpVideo"
  "DiamondCrystalVideo"
  "AudioWaveVideo"
  "LiquidMetalVideo" 
  "RainbowAuroraVideo"
)

echo "正在创建 ${#styles[@]} 个新视频组件..."

for video in "${styles[@]}"; do
  # 获取样式名称 (去掉Video后缀)
  styleName=${video%Video}
  
  echo "创建 $video 组件..."
  
  # 创建视频组件文件
  cat > "src/CaptionedVideo/${video}.tsx" << EOF
import {
  GenericCaptionedVideo,
  genericCaptionedVideoSchema,
  calculateGenericCaptionedVideoMetadata,
} from "./GenericCaptionedVideo";
import { ${styleName}Style } from "./${styleName}Style";

export const ${styleName,,}VideoSchema = genericCaptionedVideoSchema;
export const calculate${styleName}VideoMetadata = calculateGenericCaptionedVideoMetadata;

export const ${video}: React.FC<{
  src: string;
}> = ({ src }) => {
  return (
    <GenericCaptionedVideo
      src={src}
      StyleComponent={${styleName}Style}
    />
  );
};
EOF

  echo "✅ $video 创建完成"
done

echo "🎉 所有新视频组件创建完成！"