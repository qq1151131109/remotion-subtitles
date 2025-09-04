#!/bin/bash

# 批量重构所有视频组件的脚本

# 样式列表 (不包括原始的CaptionedVideo和已经重构过的)
styles=(
  "NeonGlowVideo"
  "RetroWaveVideo" 
  "GlitchVideo"
  "MinimalVideo"
  "GlassmorphismVideo"
  "GradientRainbowVideo"
  "CartoonBubbleVideo"
  "MetallicVideo"
  "NeonBorderVideo"
  "PixelArtVideo"
  "ElegantShadowVideo"
  "Embossed3DVideo"
  "FluidGradientVideo"
  "TechWireframeVideo"
  "BouncyBallVideo"
  "SpinSpiralVideo"
  "ElasticZoomVideo"
  "SwayBeatVideo"
  "ShakeImpactVideo"
  "FireFlameVideo"
  "WaterRippleVideo"
  "ElectricLightningVideo"
)

echo "开始重构 ${#styles[@]} 个视频组件..."

for style in "${styles[@]}"; do
  echo "正在重构: $style"
  
  # 获取样式名称 (去掉Video后缀)
  styleName=${style%Video}
  
  # 创建新的简化文件内容
  cat > "src/CaptionedVideo/${style}.tsx" << EOF
import {
  GenericCaptionedVideo,
  genericCaptionedVideoSchema,
  calculateGenericCaptionedVideoMetadata,
} from "./GenericCaptionedVideo";
import { ${styleName}Style } from "./${styleName}Style";

export const ${styleName,,}VideoSchema = genericCaptionedVideoSchema;
export const calculate${styleName}VideoMetadata = calculateGenericCaptionedVideoMetadata;

export const ${style}: React.FC<{
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

  echo "✅ $style 重构完成"
done

echo "🎉 所有视频组件重构完成！"