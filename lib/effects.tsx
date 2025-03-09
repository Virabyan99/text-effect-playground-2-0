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
    name: 'Color Changer',
    component: ({ text, params }) => (
      <motion.div
        initial={{ color: '#000000' }}
        animate={{ color: params.color }}
        transition={{ duration: params.duration }}
      >
        {text}
      </motion.div>
    ),
    codeTemplate: `import { motion } from 'framer-motion';\n\nexport default function ColorChanger({ text }) {\n  return (\n    <motion.div\n      initial={{ color: '#000000' }}\n      animate={{ color: {color} }}\n      transition={{ duration: {duration} }}\n    >\n      {text}\n    </motion.div>\n  );\n}\n`,
    paramsDefinition: [
      {
        name: 'color',
        type: 'color',
        label: 'Target Color',
        defaultValue: '#ff0000'
      },
      {
        name: 'duration',
        type: 'number',
        label: 'Color Change Duration',
        defaultValue: 1,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    ]
  },
  {
    name: 'Slider',
    component: ({ text, params }) => (
      <motion.div
        initial={{ x: params.direction === 'left' ? '-100vw' : '100vw' }}
        animate={{ x: 0 }}
        transition={{ duration: params.duration }}
      >
        {text}
      </motion.div>
    ),
    codeTemplate: `import { motion } from 'framer-motion';\n\nexport default function Slider({ text }) {\n  return (\n    <motion.div\n      initial={{ x: {direction} === 'left' ? '-100vw' : '100vw' }}\n      animate={{ x: 0 }}\n      transition={{ duration: {duration} }}\n    >\n      {text}\n    </motion.div>\n  );\n}\n`,
    paramsDefinition: [
      {
        name: 'direction',
        type: 'string',
        label: 'Slide Direction',
        defaultValue: 'left'
      },
      {
        name: 'duration',
        type: 'number',
        label: 'Slide Duration',
        defaultValue: 1,
        min: 0.1,
        max: 5,
        step: 0.1
      }
    ]
  },
];