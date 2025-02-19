import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            // ปิด warning ของ react-hooks/exhaustive-deps
            'react-hooks/exhaustive-deps': 'off',

            // อนุญาตให้ใช้ {} เป็น type
            '@typescript-eslint/no-empty-object-type': 'off',

            // อนุญาตให้ใช้ any
            '@typescript-eslint/no-explicit-any': 'off',

            // ปิด error ที่เกิดจากตัวแปรที่ไม่ได้ใช้
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
];

export default eslintConfig;
