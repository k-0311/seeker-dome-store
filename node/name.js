const WORD = ["Α", "α", "Β", "β", "Γ", "γ", "Δ", "δ", "Ε", "ε", "Ζ", "ζ", "Η", "η", "Θ", "θ", "Ι", "ι", "Κ", "κ", "∧", "λ", "Μ", "μ", "Ν", "ν", "Ξ", "ξ", "Ο", "ο", "∏", "π", "Ρ", "ρ", "∑", "σ", "Τ", "τ", "Υ", "υ", "Φ", "φ", "Χ", "χ", "Ψ", "ψ", "Ω", "ω", "b", "a", "f", "m", "r", "o", "l", "y", "t", "p", "n", "h", "w", "v", "c", "k", "i", "g", "x", "z", "u", "d", "q", "e", "s", "j"]

const randomName = (max = 7) => {
  let name = ''
  let len = Math.floor(Math.random() * max + 1)
  while (len > 0) {
    len--
    name += WORD[Math.floor(Math.random() * WORD.length)]
  }
  return name
}