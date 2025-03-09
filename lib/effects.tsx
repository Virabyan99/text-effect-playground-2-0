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
];