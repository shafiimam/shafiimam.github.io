import { Box, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import theme from '../../theme';
export default function Logo() {
  console.log(theme);
  const { colorMode } = useColorMode();
  const [isMobile, setIsMobile] = useState(false);
  const svgFill =
    colorMode === 'light'
      ? theme.colors.brand.dark['500']
      : theme.colors.brand.light['500'];
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
    return () => {};
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
    return () => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    };
  }, []);

  const svgVariants = {
    initial: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100px',
        width: '100px',
        zIndex: 1,
      }}
      className='shafi-logo'
    >
      <motion.svg
        id='Layer_1'
        data-name='Layer 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 113.95 142.14'
        variants={svgVariants}
        initial='initial'
        animate='visible'
        style={{
          position: 'relative',
          height: '100%',
          margin: '0 0 0 10px',
        }}
        className='shafi-imam'
      >
        <motion.path
          fill={svgFill}
          d='M207.65,287.9a7.73,7.73,0,0,1,.65-3.69c.43-.72,1.35-1.09,2.74-1.09h18.73c1.46,0,2.4.3,2.84.9a5.71,5.71,0,0,1,.64,3.18v4.49A16.22,16.22,0,0,0,234.3,298a11.18,11.18,0,0,0,2.74,4,9.9,9.9,0,0,0,3.68,2.2,12.9,12.9,0,0,0,4,.64,11.9,11.9,0,0,0,4.48-.84,10.87,10.87,0,0,0,3.64-2.39,12,12,0,0,0,3.43-8.62,18.63,18.63,0,0,0-1-6.42A19.88,19.88,0,0,0,252,281a38.91,38.91,0,0,0-5.53-5.53q-3.39-2.83-8-6.63-8.07-6.36-13.89-11.2a62,62,0,0,1-9.62-9.76,33.72,33.72,0,0,1-5.57-10.86,50.41,50.41,0,0,1-1.8-14.49q0-9.66,3.64-16.49A34.63,34.63,0,0,1,220.35,195a35.86,35.86,0,0,1,11.76-6.22,39.86,39.86,0,0,1,11.7-1.94,39.34,39.34,0,0,1,14.49,2.59,33.49,33.49,0,0,1,11.46,7.32,32.84,32.84,0,0,1,7.52,11.45,40.13,40.13,0,0,1,2.69,15v5.78a4.23,4.23,0,0,1-.75,2.94c-.5.5-1.58.75-3.23.75H257.76c-1.33,0-2.18-.27-2.54-.8a5.37,5.37,0,0,1-.55-2.89v-5.68a16.55,16.55,0,0,0-.7-4.88,11.81,11.81,0,0,0-2-4,9.67,9.67,0,0,0-3.39-2.69,10.72,10.72,0,0,0-4.73-1,11.38,11.38,0,0,0-3.83.7,9.8,9.8,0,0,0-3.49,2.19,11.37,11.37,0,0,0-2.54,3.89,15.05,15.05,0,0,0-1,5.77,17.21,17.21,0,0,0,1.05,6.28,18.14,18.14,0,0,0,3,5,30.69,30.69,0,0,0,4.73,4.53c1.86,1.46,3.92,3.06,6.18,4.78q7.17,5.38,13.39,10.41a71.65,71.65,0,0,1,10.86,10.81,47.33,47.33,0,0,1,7.32,12.8,46.06,46.06,0,0,1,2.69,16.48,32.69,32.69,0,0,1-2.74,13.25,33.82,33.82,0,0,1-7.67,11,36.76,36.76,0,0,1-11.85,7.52,44.81,44.81,0,0,1-31.53-.15,33.42,33.42,0,0,1-11.5-7.92,32.73,32.73,0,0,1-6.93-11.4,40.09,40.09,0,0,1-2.29-13.5Z'
          transform='translate(-207.65 -186.8)'
        />
        <motion.path
          fill={svgFill}
          d='M294.31,192.77a4.22,4.22,0,0,1,.9-2.84,3.25,3.25,0,0,1,2.59-1h20.42a3.1,3.1,0,0,1,2.54,1,4.43,4.43,0,0,1,.85,2.84V323q0,3.8-3.39,3.79H297.8q-3.49,0-3.49-3.79Z'
          transform='translate(-207.65 -186.8)'
        />
      </motion.svg>

      <Box
        sx={{
          height: ' 22px',
          width: '100px',
          position: 'absolute',
          top: '40px',
          background:
            colorMode === 'dark' ? 'brand.dark.200' : 'brand.light.200',
        }}
        className='dev-logo'
      >
        <motion.svg
          id='Layer_1'
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 185.41 41.49'
          initial={{
            opacity: 0,
            x: -1000,
          }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
              delay: 0.5,
            },
          }}
        >
          <rect fill={svgFill} x='0.5' y='0.5' width='184.41' height='1.84' />
          <rect fill={svgFill} x='0.5' y='39.15' width='184.41' height='1.84' />
          <path
            className='cls-2'
            d='M283.41,258.72a.71.71,0,0,1,.14-.46.52.52,0,0,1,.42-.17h5.61a7.56,7.56,0,0,1,2.36.37,5.85,5.85,0,0,1,1.93,1.05,5.09,5.09,0,0,1,1.28,1.77,5.89,5.89,0,0,1,.47,2.44v10.79a5.83,5.83,0,0,1-.47,2.44,5,5,0,0,1-1.27,1.77,5.38,5.38,0,0,1-1.9,1.09,7,7,0,0,1-2.36.37H284c-.37,0-.56-.2-.56-.61Zm6.06,17.63a1.7,1.7,0,0,0,.73-.17,1.53,1.53,0,0,0,.56-.42,1.79,1.79,0,0,0,.36-.61,2.17,2.17,0,0,0,.13-.76V263.93a1.73,1.73,0,0,0-1.44-2l-.35,0H287.8v14.38Z'
            transform='translate(-218.81 -248.83)'
          />
          <path
            className='cls-2'
            d='M306.1,258.72a.71.71,0,0,1,.14-.46.59.59,0,0,1,.42-.17h9.78c.31,0,.46.2.46.59v2.72c0,.38-.15.58-.46.58h-6v5.13h4.75a.65.65,0,0,1,.38.13.58.58,0,0,1,.15.43v2.73a.57.57,0,0,1-.14.42.56.56,0,0,1-.39.13h-4.74v5.42h6a.48.48,0,0,1,.34.14.57.57,0,0,1,.14.41v2.75a.57.57,0,0,1-.14.42.48.48,0,0,1-.34.14h-9.86c-.37,0-.56-.2-.56-.61v-20.9Z'
            transform='translate(-218.81 -248.83)'
          />
          <path
            className='cls-2'
            d='M334.34,279.64c-.1.37-.3.56-.62.56H331.1a.63.63,0,0,1-.64-.56l-4.54-20.93a.72.72,0,0,1,0-.46.33.33,0,0,1,.31-.17h3.27a.84.84,0,0,1,.44.13.51.51,0,0,1,.23.4l2,12.83.16,1.87.18-1.87,2-12.83a.55.55,0,0,1,.23-.4.94.94,0,0,1,.44-.13h3.27a.32.32,0,0,1,.31.16.54.54,0,0,1,0,.43Z'
            transform='translate(-218.81 -248.83)'
          />
          <path
            className='cls-3'
            d='M284.12,259a.71.71,0,0,1,.14-.46.59.59,0,0,1,.42-.17h5.62a7.56,7.56,0,0,1,2.36.37,6,6,0,0,1,1.92,1.09,5.32,5.32,0,0,1,1.28,1.77,6.22,6.22,0,0,1,.46,2.44v10.77a6,6,0,0,1-.46,2.44,4.91,4.91,0,0,1-1.28,1.77,5.34,5.34,0,0,1-1.89,1.09,7,7,0,0,1-2.36.37h-5.65c-.37,0-.56-.2-.56-.61Zm6.06,17.63a1.81,1.81,0,0,0,.69-.14,1.76,1.76,0,0,0,.56-.42,1.79,1.79,0,0,0,.36-.61,2.17,2.17,0,0,0,.13-.76V264.23a1.73,1.73,0,0,0-1.44-2l-.35,0h-1.66v14.38Z'
            transform='translate(-218.81 -248.83)'
          />
          <path
            className='cls-3'
            d='M306.81,259a.71.71,0,0,1,.14-.46.59.59,0,0,1,.42-.17h9.78c.31,0,.46.2.46.59v2.72c0,.38-.15.58-.46.58h-6v5.13h4.74a.65.65,0,0,1,.38.13.58.58,0,0,1,.15.43v2.73a.57.57,0,0,1-.14.42.48.48,0,0,1-.38.13h-4.75v5.42h6a.48.48,0,0,1,.34.14.57.57,0,0,1,.14.41V280a.57.57,0,0,1-.14.42.48.48,0,0,1-.34.14h-9.78c-.37,0-.56-.2-.56-.61Z'
            transform='translate(-218.81 -248.83)'
          />
          <path
            className='cls-3'
            d='M335.05,279.94c-.11.37-.3.56-.62.56h-2.62a.63.63,0,0,1-.64-.56L326.63,259a.72.72,0,0,1,0-.46.33.33,0,0,1,.31-.17h3.27a.84.84,0,0,1,.44.13.51.51,0,0,1,.23.4l2,12.83.16,1.87.18-1.87,2-12.83a.55.55,0,0,1,.23-.4.94.94,0,0,1,.44-.13h3.27a.32.32,0,0,1,.31.16.54.54,0,0,1,0,.43Z'
            transform='translate(-218.81 -248.83)'
          />
          <path
            fill={svgFill}
            d='M283.8,259a.71.71,0,0,1,.14-.46.52.52,0,0,1,.42-.17H290a7.56,7.56,0,0,1,2.36.37,5.8,5.8,0,0,1,1.92,1.09,5.09,5.09,0,0,1,1.28,1.77,6,6,0,0,1,.46,2.44v10.77a5.82,5.82,0,0,1-.46,2.44,5,5,0,0,1-1.27,1.77,5.38,5.38,0,0,1-1.9,1.09,7,7,0,0,1-2.36.37h-5.64c-.37,0-.56-.2-.56-.61Zm6,17.63a1.7,1.7,0,0,0,.73-.17,1.5,1.5,0,0,0,.55-.42,1.57,1.57,0,0,0,.36-.61,2.18,2.18,0,0,0,.14-.76V264.24a1.73,1.73,0,0,0-1.44-2l-.35,0h-1.66v14.38Z'
            transform='translate(-218.81 -248.83)'
          />
          <path
            fill={svgFill}
            d='M306.48,259a.71.71,0,0,1,.14-.46.59.59,0,0,1,.42-.17h9.83c.31,0,.46.2.46.59v2.72c0,.38-.15.58-.46.58h-6v5.13h4.74a.65.65,0,0,1,.38.13.58.58,0,0,1,.15.43v2.73a.57.57,0,0,1-.14.42.53.53,0,0,1-.38.13h-4.75v5.42h6a.48.48,0,0,1,.34.14.57.57,0,0,1,.14.41V280a.57.57,0,0,1-.14.42.48.48,0,0,1-.34.14H307c-.37,0-.56-.2-.56-.61V259Z'
            transform='translate(-218.81 -248.83)'
          />
          <path
            fill={svgFill}
            d='M334.72,280c-.1.37-.3.56-.62.56h-2.62a.63.63,0,0,1-.64-.56L326.3,259a.72.72,0,0,1,0-.46.33.33,0,0,1,.31-.17h3.26a.84.84,0,0,1,.44.13.51.51,0,0,1,.23.4l2,12.83.16,1.87.18-1.87,2-12.83a.55.55,0,0,1,.23-.4.94.94,0,0,1,.44-.13h3.32a.32.32,0,0,1,.31.16.54.54,0,0,1,0,.43Z'
            transform='translate(-218.81 -248.83)'
          />
        </motion.svg>
      </Box>
    </Box>
  );
}
