import { motion } from 'framer-motion';

interface Param {
  name: string;
  type: string;
  label: string;
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
}

interface Effect {
  name: string;
  codeName: string; // Added codeName
  component: React.FC<{ text: string; params: any }>;
  codeTemplate: string;
  paramsDefinition: Param[];
}

export const effects: Effect[] = [
  {
    name: 'No Effect',
    codeName: 'NoEffect', // Added codeName
    component: ({ text }) => <div>{text}</div>,
    codeTemplate: `export default function NoEffect({ text }) {\n  return <div>{text}</div>;\n}\n`,
    paramsDefinition: []
  },
  {
    name: 'Fader',
    codeName: 'Fader', // Added codeName
    component: ({ text, params }) => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: params.duration }}
      >
        {text}
      </motion.div>
    ),
    codeTemplate: `import { motion } from 'framer-motion';\n\nexport default function Fader({ text }) {\n  return (\n    <motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      transition={{ duration: {duration} }}\n    >\n      {text}\n    </motion.div>\n  );\n}\n`,
    paramsDefinition: [
      {
        name: 'duration',
        type: 'number',
        label: 'Duration',
        defaultValue: 1,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    ]
  },
  {
    name: 'Cascading',
    codeName: 'Cascading', // Added codeName
    component: ({ text, params }) => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: params.stagger }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * params.stagger }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    ),
    codeTemplate: `import { motion } from 'framer-motion';\n\nexport default function Cascading({ text }) {\n  return (\n    <motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      transition={{ staggerChildren: {stagger} }}\n    >\n      {text.split('').map((char, index) => (\n        <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * {stagger} }}>\n          {char}\n        </motion.span>\n      ))}\n    </motion.div>\n  );\n}\n`,
    paramsDefinition: [
      {
        name: 'stagger',
        type: 'number',
        label: 'Stagger Delay',
        defaultValue: 0.1,
        min: 0.01,
        max: 1,
        step: 0.01
      }
    ]
  },
  {
    name: 'Rotator',
    codeName: 'Rotator', // Added codeName
    component: ({ text, params }) => (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: params.duration }}
      >
        {text}
      </motion.div>
    ),
    codeTemplate: `import { motion } from 'framer-motion';\n\nexport default function Rotator({ text }) {\n  return (\n    <motion.div\n      initial={{ rotate: 0 }}\n      animate={{ rotate: 360 }}\n      transition={{ duration: {duration} }}\n    >\n      {text}\n    </motion.div>\n  );\n}\n`,
    paramsDefinition: [
      {
        name: 'duration',
        type: 'number',
        label: 'Rotation Duration',
        defaultValue: 2,
        min: 0.5,
        max: 10,
        step: 0.5
      }
    ]
  },
  {
    name: 'Neon Glowing Text',
    codeName: 'NeonText', // Added codeName
    component: ({ text, params }) => (
      <motion.span
        style={{
          color: params.color,
          fontWeight: 'bold',
          textShadow: `${params.glowStrength}px ${params.glowStrength}px ${params.glowBlur}px ${params.glowColor}`,
        }}
        animate={{
          textShadow: [
            `${params.glowStrength}px ${params.glowStrength}px ${params.glowBlur}px ${params.glowColor}`,
            `0px 0px 0px ${params.glowColor}`,
            `${params.glowStrength}px ${params.glowStrength}px ${params.glowBlur}px ${params.glowColor}`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      >
        {text}
      </motion.span>
    ),
    codeTemplate: `import { motion } from 'framer-motion';\n\nexport default function NeonText({ text }) {\n  return (\n    <motion.span\n      style={{ color: {color}, fontWeight: 'bold', textShadow: '{glowStrength}px {glowStrength}px {glowBlur}px {glowColor}' }}\n      animate={{\n        textShadow: [\n          '{glowStrength}px {glowStrength}px {glowBlur}px {glowColor}',\n          '0px 0px 0px {glowColor}',\n          '{glowStrength}px {glowStrength}px {glowBlur}px {glowColor}'\n        ]\n      }}\n      transition={{\n        duration: 2,\n        repeat: Infinity,\n        repeatType: 'reverse',\n        ease: 'easeInOut'\n      }}\n    >\n      {text}\n    </motion.span>\n  );\n}\n`,
    paramsDefinition: [
      { name: 'color', type: 'color', label: 'Text Color', defaultValue: '#ff00ff' },
      { name: 'glowColor', type: 'color', label: 'Glow Color', defaultValue: '#ff00ff' },
      { name: 'glowStrength', type: 'number', label: 'Glow Strength', defaultValue: 5, min: 1, max: 10, step: 0.1 },
      { name: 'glowBlur', type: 'number', label: 'Glow Blur', defaultValue: 10, min: 1, max: 20, step: 1 }
    ]
  },
  {
    name: 'Bouncy Text',
    codeName: 'BouncyText', // Added codeName
    component: ({ text, params }) => (
      <motion.span
        style={{ display: 'inline-block' }}
        animate={{
          y: [0, -30, 0]
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0.5
        }}
      >
        {text}
      </motion.span>
    ),
    codeTemplate: `import { motion } from 'framer-motion';\n\nexport default function BouncyText({ text }) {\n  return (\n    <motion.span\n      style={{ display: 'inline-block' }}\n      animate={{ y: [0, -30, 0] }}\n      transition={{\n        duration: 0.6,\n        ease: 'easeOut',\n        repeat: Infinity,\n        repeatType: 'loop',\n        repeatDelay: 0.5\n      }}\n    >\n      {text}\n    </motion.span>\n  );\n}\n`,
    paramsDefinition: []
  },
  {
    name: 'MicroTextWeightShiftEffect',
    codeName: 'MicroTextWeightShiftEffect', // Added codeName
    component: ({ text }) => (
      <div className="h-full flex flex-wrap items-center justify-center p-4 overflow-auto">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-2xl m-1"
            initial={{ filter: 'blur(2px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.05,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    ),
    codeTemplate: `export default function MicroTextWeightShiftEffect({ text }) {\n  return (\n    <div className="h-full flex flex-wrap items-center justify-center p-4 overflow-auto">\n      {text.split('').map((char, index) => (\n        <motion.span\n          key={index}\n          className="inline-block text-2xl m-1"\n          initial={{ filter: 'blur(2px)' }}\n          animate={{ filter: 'blur(0px)' }}\n          transition={{\n            duration: 0.6,\n            ease: 'easeInOut',\n            repeat: Infinity,\n            repeatType: 'reverse',\n            delay: index * 0.05,\n          }}\n        >\n          {char}\n        </motion.span>\n      ))}\n    </div>\n  );\n}`,
    paramsDefinition: []
  },
  {
    name: 'SoftFocusPulseEffect',
    codeName: 'SoftFocusPulseEffect', // Added codeName
    component: ({ text }) => (
      <div className="h-full flex flex-wrap items-center justify-center p-4 overflow-auto">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-2xl m-1 font-light"
            whileHover={{ fontWeight: 700 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    ),
    codeTemplate: `export default function SoftFocusPulseEffect({ text }) {\n  return (\n    <div className="h-full flex flex-wrap items-center justify-center p-4 overflow-auto">\n      {text.split('').map((char, index) => (\n        <motion.span\n          key={index}\n          className="inline-block text-2xl m-1 font-light"\n          whileHover={{ fontWeight: 700 }}\n          transition={{ duration: 0.2, ease: 'easeInOut' }}\n        >\n          {char}\n        </motion.span>\n      ))}\n    </div>\n  );\n}`,
    paramsDefinition: []
  },
  {
    name: 'GentleOpacityFadeEffect',
    codeName: 'GentleOpacityFadeEffect', // Added codeName
    component: ({ text }) => (
      <div className="h-full flex flex-wrap items-center justify-center p-4 overflow-auto">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-2xl m-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: index * 0.05,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    ),
    codeTemplate: `export default function GentleOpacityFadeEffect({ text }) {\n  return (\n    <div className="h-full flex flex-wrap items-center justify-center p-4 overflow-auto">\n      {text.split('').map((char, index) => (\n        <motion.span\n          key={index}\n          className="inline-block text-2xl m-1"\n          initial={{ opacity: 0 }}\n          animate={{ opacity: 1 }}\n          transition={{\n            duration: 0.8,\n            ease: 'easeOut',\n            delay: index * 0.05,\n          }}\n        >\n          {char}\n        </motion.span>\n      ))}\n    </div>\n  );\n}`,
    paramsDefinition: []
  }
];