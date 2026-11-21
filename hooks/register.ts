import type { Register, SessionRateLimit } from 'claude-code'

// 표시: "5시간 4% (15:30) │ 주간 18% (월 09:00)"  — 괄호 안은 초기화 시각(한국 시간)
const LABELS: Record<string, string> = { five_hour: '5시간', seven_day: '주간' }
const ORDER = ['five_hour', 'seven_day']
const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const KST = 9 * 3600_000

function resetAt(kind: string, resetsAt: string | undefined): string {
  if (!resetsAt) return ''
  const t = Date.parse(resetsAt)
  if (!Number.isFinite(t)) return ''
  const d = new Date(t + KST) // UTC getter로 한국 시간 읽기
  const hm = `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
  return kind === 'seven_day' ? ` (${DAYS[d.getUTCDay()]} ${hm})` : ` (${hm})`
}

function line(limits: SessionRateLimit[]): string {
  return ORDER.map(k => {
    const l = limits.find(x => x.kind === k)
    if (!l) return `${LABELS[k]} –`
    const warn = l.percentUsed >= 90 ? '⚠ ' : ''
    return `${warn}${LABELS[k]} ${Math.round(l.percentUsed)}%${resetAt(k, l.resetsAt)}`
  }).join(' │ ')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    $.ui.status(line((await $.session.usage()).rateLimits))
    return result
  })

  on('session.measure', ($, e, next) => {
    if (e.changed.includes('rateLimits')) $.ui.status(line(e.rateLimits))
    return next(e)
  })
}
