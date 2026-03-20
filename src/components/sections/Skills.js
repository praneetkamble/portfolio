import { useRef, useState } from 'react';
import styled from 'styled-components';
import SectionWrapper from '@/components/SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { FiLayout, FiDatabase, FiPenTool, FiTerminal, FiCode, FiLayers } from 'react-icons/fi';

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  grid-auto-rows: minmax(280px, auto);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BentoCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  transition: all 0.3s ease;
  
  /* Layout handling based on props */
  ${({ $spanCols }) => $spanCols === 2 && `
    @media (min-width: 768px) { grid-column: span 2 / span 2; }
  `}
  ${({ $spanRows }) => $spanRows === 2 && `
    @media (min-width: 768px) { grid-row: span 2 / span 2; }
  `}

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadowLg};
  }
`;

const Spotlight = styled.div`
  pointer-events: none;
  position: absolute;
  inset: -1px;
  border-radius: ${({ theme }) => theme.radii.xl};
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    600px circle at ${({ $x }) => $x}px ${({ $y }) => $y}px, 
    ${({ theme }) => theme.colors.accent}26,
    transparent 40%
  );

  ${BentoCardWrapper}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  
  ${({ $flexRowMd }) => $flexRowMd && `
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  `}
`;

const IconWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.gradientSubtle};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
  transition: transform 0.5s ease;
  z-index: 20;

  ${BentoCardWrapper}:hover & {
    transform: scale(1.1);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
  z-index: 20;
`;

const CardDesc = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
  margin-bottom: 2rem;
  z-index: 20;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  z-index: 20;
`;

const TechTag = styled.span`
  padding: 0.35rem 0.75rem;
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

// -- Graphics --

const FrontendGraphic = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
    height: 300px;
    pointer-events: none;
    perspective: 1000px;
  }

  /* Right-to-Left support */
  [dir='rtl'] & {
    right: auto;
    left: -5%;
  }

  .perspective-container {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.7s ease-out;
    transform-style: preserve-3d;
  }

  ${BentoCardWrapper}:hover .perspective-container {
    transform: rotateX(15deg) rotateY(-20deg) scale(1.05);
  }

  [dir='rtl'] ${BentoCardWrapper}:hover .perspective-container {
    transform: rotateX(15deg) rotateY(20deg) scale(1.05);
  }
`;

const BackendGraphic = styled.div`
  flex-grow: 1;
  position: relative;
  width: 100%;
  margin-top: 1rem;
  min-height: 160px;
  opacity: 0.4;
  transition: opacity 0.5s ease;
  z-index: 0;

  ${BentoCardWrapper}:hover & {
    opacity: 1;
  }
`;

const UIGraphic = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 40%;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    height: 100%;
    padding-left: 2rem;
  }

  [dir='rtl'] & {
    justify-content: flex-start;
    padding-left: 0;
    padding-right: 2rem;
  }

  .circle-container {
    width: 12rem;
    height: 12rem;
    background: rgba(30,41,59,0.3);
    border-radius: 50%;
    border: 1px solid rgba(51,65,85,0.5);
    position: relative;
    animation: spin 20s linear infinite;
    transition: border-color 0.5s ease;
  }

  ${BentoCardWrapper}:hover .circle-container {
    border-color: rgba(224,64,251,0.3); /* Theme accent color glow */
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// -- Reusable Component --
const BentoCard = ({ children, spanCols, spanRows, flexRowMd }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <BentoCardWrapper 
      ref={cardRef} 
      onMouseMove={handleMouseMove}
      $spanCols={spanCols}
      $spanRows={spanRows}
    >
      <Spotlight $x={mousePosition.x} $y={mousePosition.y} />
      <CardContent $flexRowMd={flexRowMd}>
        {children}
      </CardContent>
    </BentoCardWrapper>
  );
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="skills" label={t('skills.label')} title={t('skills.title')} description={t('skills.description')}>
      <BentoGrid>
        
        {/* 1. Frontend Engineering (Spans 2 columns) */}
        <BentoCard spanCols={2} flexRowMd>
          <div style={{ flex: '1', zIndex: '20', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <IconWrapper><FiLayout /></IconWrapper>
            <CardTitle>{t('skills.frontend')}</CardTitle>
            <CardDesc style={{ maxWidth: '400px' }}>{t('skills.frontendDesc')}</CardDesc>
            <TechTags>
              {['React', 'Next.js', 'Tailwind', 'GSAP'].map(tech => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </TechTags>
          </div>

          <FrontendGraphic>
            <div className="perspective-container">
              {/* Back Window */}
              <div style={{ position: 'absolute', inset: '2rem 1rem', background: 'rgba(30,30,40,0.8)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden', transform: 'translateZ(-50px)' }}>
                <div style={{ height: '1.5rem', background: 'rgba(20,20,30,1)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 0.75rem', gap: '0.375rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4b5563' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4b5563' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4b5563' }} />
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.5 }}>
                  <div style={{ height: '0.75rem', width: '75%', background: '#374151', borderRadius: '0.375rem' }} />
                  <div style={{ height: '0.75rem', width: '50%', background: '#374151', borderRadius: '0.375rem' }} />
                </div>
              </div>

              {/* Front Window */}
              <div style={{ position: 'absolute', inset: '0.5rem', background: 'rgba(108,99,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(108,99,255,0.3)', borderRadius: '1rem', boxShadow: '0 0 40px rgba(108,99,255,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', transform: 'translateZ(40px)' }}>
                <div style={{ height: '1.5rem', background: 'rgba(30,30,60,0.5)', borderBottom: '1px solid rgba(108,99,255,0.2)', display: 'flex', alignItems: 'center', padding: '0 0.75rem', gap: '0.375rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(108,99,255,0.2)', border: '1px solid rgba(108,99,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiCode size={14} color="#a5b4fc" />
                    </div>
                    <div style={{ height: '0.75rem', width: '6rem', background: 'rgba(108,99,255,0.2)', borderRadius: '0.375rem' }} />
                  </div>
                  <div style={{ flex: 1, width: '100%', background: 'rgba(15,23,42,0.5)', borderRadius: '0.5rem', border: '1px solid rgba(108,99,255,0.1)', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ height: '0.5rem', width: '100%', background: 'rgba(108,99,255,0.2)', borderRadius: '9999px' }} />
                    <div style={{ height: '0.5rem', width: '80%', background: 'rgba(108,99,255,0.2)', borderRadius: '9999px' }} />
                    <div style={{ height: '0.5rem', width: '66%', background: 'rgba(108,99,255,0.2)', borderRadius: '9999px' }} />
                  </div>
                </div>
              </div>
            </div>
          </FrontendGraphic>
        </BentoCard>

        {/* 2. Backend Architecture (Spans 1 column, 2 rows) */}
        <BentoCard spanCols={1} spanRows={2}>
          <IconWrapper><FiDatabase /></IconWrapper>
          <CardTitle>{t('skills.backend')}</CardTitle>
          <CardDesc>{t('skills.backendDesc')}</CardDesc>
          
          <BackendGraphic>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
              {[1, 2, 3].map((node) => (
                <div key={node} style={{ width: '100%', maxWidth: '180px', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiTerminal size={14} color="#10b981" />
                  <div style={{ height: '6px', width: '100%', background: '#334155', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: '#10b981', borderRadius: '9999px', width: `${(node / 3) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </BackendGraphic>

          <TechTags>
            {['Node.js', 'PostgreSQL', 'Redis', 'AWS'].map(tech => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </TechTags>
        </BentoCard>

        {/* 3. UI/UX Prototyping (Spans 2 columns) */}
        <BentoCard spanCols={2} flexRowMd>
          <div style={{ flex: '1', zIndex: '20', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <IconWrapper><FiPenTool /></IconWrapper>
            <CardTitle>{t('skills.devops')}</CardTitle>
            <CardDesc style={{ maxWidth: '400px' }}>{t('skills.devopsDesc')}</CardDesc>
            <TechTags>
              {['Figma', 'Framer', 'Storybook'].map(tech => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </TechTags>
          </div>

          <UIGraphic>
            <div className="circle-container">
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(224,64,251,0.2)', border: '1px solid rgba(224,64,251,0.5)', backdropFilter: 'blur(4px)' }} />
              <div style={{ position: 'absolute', bottom: '25%', right: '-0.5rem', width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'rgba(108,99,255,0.2)', border: '1px solid rgba(108,99,255,0.5)', backdropFilter: 'blur(4px)' }} />
              <div style={{ position: 'absolute', bottom: '25%', left: '-0.5rem', width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', backdropFilter: 'blur(4px)' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#475569' }}>
                <FiLayers size={40} />
              </div>
            </div>
          </UIGraphic>
        </BentoCard>

      </BentoGrid>
    </SectionWrapper>
  );
}
