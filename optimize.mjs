#!/usr/bin/env node

import { execSync } from 'child_process'
import { readdirSync, statSync } from 'fs'
import { join, basename } from 'path'

const CWEBP = 'script/cwebp.exe'
const INPUT_DIR = 'public/imgs/vr'
const QUALITY = 70
const MAX_WIDTH = 4096

console.log('========================================')
console.log('  VR Image Optimizer')
console.log('========================================')
console.log()
console.log(`Quality: ${QUALITY}%`)
console.log(`Max width: ${MAX_WIDTH}px`)
console.log()

const files = readdirSync(INPUT_DIR).filter(f => f.endsWith('.webp'))
let totalOriginal = 0
let totalOptimized = 0

for (const file of files) {
  const inputPath = join(INPUT_DIR, file)
  const originalSize = statSync(inputPath).size
  totalOriginal += originalSize

  console.log(`Processing: ${file}`)
  console.log(`  Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`)

  try {
    execSync(`"${CWEBP}" -q ${QUALITY} -m 6 -resize 0 ${MAX_WIDTH} "${inputPath}" -o "${inputPath}"`, { stdio: 'pipe' })
    const newSize = statSync(inputPath).size
    totalOptimized += newSize
    console.log(`  Optimized: ${(newSize / 1024 / 1024).toFixed(2)} MB`)
    console.log(`  Saved: ${((1 - newSize / originalSize) * 100).toFixed(1)}%`)
  } catch (err) {
    console.log(`  Error: ${err.message}`)
    totalOptimized += originalSize
  }
  console.log()
}

console.log('========================================')
console.log('  Summary')
console.log('========================================')
console.log(`Total original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`)
console.log(`Total optimized: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`)
console.log(`Total saved: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`)
console.log('========================================')