import { EXTRA } from '@/view/neurasthenia/constant'
import { randRange } from '@/view/neurasthenia/utils'

export const additionalChallenges = (data) => {
  if (!data) return []
  const { typeStr, successNumber } = data
  const challenges = [
    {
      successNumber: 10,
      elite: [
        [EXTRA.Countdown],
        [EXTRA.Shuffle],
        [EXTRA.Mistake]
      ]
    },
    {
      successNumber: 9999,
      normal: [
        [EXTRA.Countdown],
        [EXTRA.Shuffle],
        [EXTRA.Mistake]
      ],
      elite: [
        [EXTRA.Countdown, EXTRA.Shuffle],
        [EXTRA.Countdown, EXTRA.Mistake],
        [EXTRA.Shuffle, EXTRA.Mistake]
      ],
      boss: [
        [EXTRA.Countdown, EXTRA.Shuffle, EXTRA.Mistake]
      ]
    }
  ].find(item => item.successNumber > successNumber)
  const challenge = challenges[typeStr.toLocaleLowerCase()]
  return challenge?.[randRange(0, challenge.length - 1)] || []
}
