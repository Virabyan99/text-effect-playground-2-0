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
  component: React.FC<{ text: string; params: any }>;
  codeTemplate: string;
  paramsDefinition: Param[];
}

export const effects: Effect[] = [
  {
    name: 'No Effect',
    component: ({ text }) => <div>{text}</div>,
    codeTemplate: `export default function NoEffect({ text }) {\n  return <div>{text}</div>;\n}\n`,
    paramsDefinition: []
  },
  {
    name: 'Fader',
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
  }
];
