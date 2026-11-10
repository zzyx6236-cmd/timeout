export type ExerciseMode = 'hold_repeat' | 'alternating_hold' | 'reps_peak_hold'

export interface ExerciseDetail {
  area: string
  purpose: string
  dose: string
  posture: string[]
  effort: string[]
  breath: string[]
  feel: string
  extra?: string
}

export interface Exercise {
  id: number
  name: string
  focus: string
  mode: ExerciseMode
  holdSeconds: number
  reps: number
  perSide: number
  restSeconds: number
  detail: ExerciseDetail
}

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    name: '隐形收腹',
    focus: '腹横肌激活',
    mode: 'hold_repeat',
    holdSeconds: 8,
    reps: 8,
    perSide: 0,
    restSeconds: 5,
    detail: {
      area: '腹横肌、深层核心肌群',
      purpose: '提高腹部稳定能力，帮助改善久坐时塌腰、腹部松散的习惯',
      dose: '保持 5～10 秒（默认 8），重复 8 次',
      posture: ['坐在椅子中间，臀部均匀受力', '双脚平放地面，与髋部同宽', '脊柱自然伸展，不要刻意挺胸翘腰', '双手自然放在大腿上'],
      effort: ['注意力放在肚脐周围和下腹部', '想象有人轻轻要碰你的肚子，你提前绷紧腹部保护自己', '腹部整体轻轻收紧，像系紧一条腰带', '不要用力把肚子吸进去，也不要夹紧臀部'],
      breath: ['收紧时缓慢呼气', '保持收紧时继续小幅自然呼吸', '放松时吸气', '绝对不要憋气'],
      feel: '腹部有一圈轻微的紧实感，但仍然能够正常呼吸。',
    },
  },
  {
    id: 2,
    name: '桌下抬腿',
    focus: '大腿前侧训练',
    mode: 'alternating_hold',
    holdSeconds: 3,
    reps: 10,
    perSide: 10,
    restSeconds: 2,
    detail: {
      area: '股四头肌（大腿前侧）、髋屈肌',
      purpose: '保持大腿肌肉活动，减少长时间静坐带来的肌肉活动不足',
      dose: '左右各 10 次，每次停留 3 秒',
      posture: ['坐在椅子前 1/3 处，但不要坐得太靠前，以免失去支撑', '臀部保持稳定，不要向后滑', '腰背自然挺直', '双手扶住椅子两侧', '双腿自然弯曲，脚掌先放在地面'],
      effort: ['慢慢伸直一侧膝盖', '将小腿抬起，直到大腿与小腿基本成一直线', '大腿前侧肌肉主动收紧', '脚尖自然朝上，不要刻意绷脚尖', '不要为了抬高腿而向后仰身体'],
      breath: ['抬腿时呼气', '保持 3 秒时正常呼吸', '缓慢放下时吸气'],
      feel: '大腿前侧明显发力，而不是腰部和腹股沟代偿。',
    },
  },
  {
    id: 3,
    name: '臀肌收紧',
    focus: '臀大肌激活',
    mode: 'hold_repeat',
    holdSeconds: 8,
    reps: 10,
    perSide: 0,
    restSeconds: 5,
    detail: {
      area: '臀大肌',
      purpose: '减少久坐期间臀肌长期缺少主动收缩的情况',
      dose: '保持 5～10 秒（默认 8），重复 10 次',
      posture: ['坐在椅子中间', '双脚平放地面，与髋部同宽', '双膝自然弯曲约 90 度', '腰背自然伸展，不要刻意挺腰'],
      effort: ['想象臀部两侧向中间轻轻夹紧', '两侧臀部同时收缩', '注意是臀部肌肉发力，而不是大腿夹紧', '不要夹紧肛门，不要夹腿，也不要把骨盆向前顶'],
      breath: ['收紧臀部时呼气', '保持收紧时正常呼吸', '放松时吸气'],
      feel: '臀部两侧有明显收缩感，身体没有向前或向后晃动。',
    },
  },
  {
    id: 4,
    name: '踮脚提踵',
    focus: '小腿肌肉泵',
    mode: 'reps_peak_hold',
    holdSeconds: 3,
    reps: 25,
    perSide: 0,
    restSeconds: 2,
    detail: {
      area: '腓肠肌、比目鱼肌',
      purpose: '激活小腿肌肉泵，辅助下肢静脉回流',
      dose: '25 次，读 3 秒 + 间隔 2 秒',
      posture: ['坐在椅子中间', '腰背自然挺直', '双膝约 90 度', '双脚平行放在地面，与髋部同宽', '膝盖不要内扣或外翻'],
      effort: ['脚掌前半部分保持贴地', '缓慢抬起两个脚跟', '尽量让脚跟向上移动，而不是脚趾蜷缩', '再缓慢放下，脚跟轻轻接触地面'],
      breath: ['踮起脚跟时呼气', '顶端停留时正常呼吸', '放下脚跟时吸气'],
      feel: '小腿后侧有收缩感，脚趾没有用力抓地。',
      extra: '这个动作可以搭配脚尖抬起的勾脚动作，让小腿前侧也活动起来。',
    },
  },
  {
    id: 5,
    name: '肩胛骨夹紧',
    focus: '肩背稳定',
    mode: 'hold_repeat',
    holdSeconds: 5,
    reps: 10,
    perSide: 0,
    restSeconds: 5,
    detail: {
      area: '菱形肌、中斜方肌',
      purpose: '改善久坐时肩膀向前、圆肩的习惯，增强肩胛骨控制能力',
      dose: '保持 5 秒，重复 10 次',
      posture: ['坐在椅子中间', '双脚平放地面', '腰背自然挺直', '双手自然放在大腿上', '下巴微微回收，眼睛平视前方'],
      effort: ['想象两侧肩胛骨之间夹着一张纸', '两侧肩胛骨缓慢向脊柱靠近', '感受两侧肩胛骨中间的肌肉收紧', '肩膀保持下沉，不要耸肩', '不要挺肚子、过度挺胸或刻意向后仰'],
      breath: ['肩胛骨向后收紧时呼气', '保持 5 秒时自然呼吸', '放松时吸气'],
      feel: '肩胛骨中间有轻微收缩感，脖子和斜方肌上部不紧张。',
    },
  },
]

export function exerciseById(id: number) {
  return EXERCISES.find((item) => item.id === id)
}
