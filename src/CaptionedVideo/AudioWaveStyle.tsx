import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

interface AudioWaveStyleProps {
  page: {
    tokens: Array<{
      text: string;
      ts: number;
      end: number;
    }>;
  };
  enterProgress: number;
}

export const AudioWaveStyle: React.FC<AudioWaveStyleProps> = ({
  page,
  enterProgress,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 响应式尺寸计算
  const baseFontSize = Math.min(width, height) * 0.04;
  const waveBarWidth = Math.min(width, height) * 0.0037;
  const waveAmplitudeBase = Math.min(width, height) * 0.028;
  const waveAmplitudeVar = Math.min(width, height) * 0.018;
  const spectrumHeight = Math.min(width, height) * 0.018;
  const spectrumDistance = Math.min(width, height) * 0.046;
  const particleSize = Math.min(width, height) * 0.0037;
  const particleOrbitX = Math.min(width, height) * 0.056;
  const particleOrbitY = Math.min(width, height) * 0.037;
  
  return (
    <AbsoluteFill style={{
      justifyContent: "flex-end",
      alignItems: "center",
      top: undefined,
      bottom: height * 0.18,
      height: height * 0.08,
      background: "linear-gradient(45deg, rgba(16,0,43,0.8), rgba(0,16,43,0.8))",
    }}>
      {/* 背景音波 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {Array.from({length: 20}).map((_, i) => {
          const amplitude = waveAmplitudeBase + Math.sin((frame + i * 8) * 0.1) * waveAmplitudeVar;
          const frequency = 0.02 + i * 0.001;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${i * 5}%`,
                bottom: '20%',
                width: `${waveBarWidth}px`,
                height: `${amplitude}px`,
                background: `hsl(${180 + i * 10}, 70%, 60%)`,
                opacity: 0.4,
                borderRadius: '2px',
                transform: `translateY(${Math.sin(frame * frequency) * (Math.min(width, height) * 0.0093)}px)`,
              }}
            />
          );
        })}
      </div>
      
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: Math.min(width, height) * 0.022,
        maxWidth: "90%",
        position: 'relative',
      }}>
        {page.tokens.map((token, tokenIndex) => {
          const isCurrentlyReading = tokenIndex / page.tokens.length <= enterProgress;
          const beatPulse = Math.sin((frame + tokenIndex * 10) * 0.15) * 0.3 + 1;
          
          return (
            <div
              key={tokenIndex}
              style={{
                position: 'relative',
                transform: `scale(${isCurrentlyReading ? beatPulse : 1})`,
              }}
            >
              {/* 音频频谱环绕 */}
              {isCurrentlyReading && (
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}>
                  {Array.from({length: 16}).map((_, i) => {
                    const angle = (i * 22.5);
                    const waveHeight = spectrumHeight + Math.sin((frame + i * 5) * 0.12) * (spectrumHeight * 0.75);
                    return (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          width: `${waveBarWidth}px`,
                          height: `${waveHeight}px`,
                          background: `hsl(${180 + i * 12}, 80%, 65%)`,
                          borderRadius: '2px',
                          transform: `
                            translate(-50%, -50%)
                            rotate(${angle}deg)
                            translateY(-${spectrumDistance}px)
                          `,
                          transformOrigin: `center ${spectrumDistance}px`,
                          boxShadow: `0 0 ${Math.min(width, height) * 0.0074}px hsl(${180 + i * 12}, 80%, 65%)`,
                        }}
                      />
                    );
                  })}
                </div>
              )}
              
              <span style={{
                fontFamily: "Audiowide, monospace",
                fontSize: baseFontSize,
                fontWeight: 700,
                background: isCurrentlyReading
                  ? `linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff)`
                  : "#ffffff",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: isCurrentlyReading ? "transparent" : "#ffffff",
                backgroundClip: "text",
                textShadow: isCurrentlyReading
                  ? `0 0 ${Math.min(width, height) * 0.018}px rgba(0,255,255,0.8), 0 0 ${Math.min(width, height) * 0.037}px rgba(255,0,255,0.6),
                     -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000`
                  : "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
                padding: isCurrentlyReading ? `${Math.min(width, height) * 0.011}px ${Math.min(width, height) * 0.017}px` : `${Math.min(width, height) * 0.0056}px ${Math.min(width, height) * 0.0093}px`,
                borderRadius: `${Math.min(width, height) * 0.011}px`,
                border: isCurrentlyReading ? `2px solid rgba(0,255,255,0.5)` : "none",
                position: 'relative',
                top: isCurrentlyReading ? "-2px" : "0px",
                display: 'inline-block',
                background: isCurrentlyReading
                  ? `linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1))`
                  : 'transparent',
                animation: isCurrentlyReading ? 'audio-pulse 0.3s ease-in-out infinite alternate' : 'none',
              }}>
                {token.text}
              </span>

              {/* 声波粒子 */}
              {isCurrentlyReading && Array.from({length: 10}).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: `${particleSize}px`,
                    height: `${particleSize}px`,
                    background: `hsl(${180 + i * 18}, 80%, 70%)`,
                    borderRadius: '50%',
                    left: Math.sin((frame + i * 36) * 0.08) * particleOrbitX + 50 + '%',
                    top: Math.cos((frame + i * 36) * 0.08) * particleOrbitY + 50 + '%',
                    opacity: 0.7,
                    boxShadow: `0 0 ${Math.min(width, height) * 0.0093}px hsl(${180 + i * 18}, 80%, 70%)`,
                    pointerEvents: 'none',
                    transform: `scale(${0.5 + Math.sin((frame + i) * 0.1) * 0.8})`,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes audio-pulse {
          0% { filter: brightness(1) saturate(1); }
          100% { filter: brightness(1.2) saturate(1.3); }
        }
      `}</style>
    </AbsoluteFill>
  );
};