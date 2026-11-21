# usage-status

Claude Code 상태 표시줄에 Claude 플랜의 5시간 사용량과 주간 사용량, 각 초기화 시각(한국 시간)을 항상 보여주는 mod입니다.

```
5시간 4% (15:30) │ 주간 18% (월 09:00)
```

사용량이 90% 이상이면 앞에 ⚠가 붙습니다. 수치는 Claude의 첫 응답 이후부터 표시됩니다.

## 설치

터미널의 Claude Code 프롬프트에서:

```
/plugin install usage-status --marketplace hoonmin2-code/usage-status
```

`Add marketplace?`에 `y`, 설치 범위는 user(기본값)를 선택하세요.

셸에서:

```
claude plugin install usage-status --marketplace hoonmin2-code/usage-status
```

데스크톱 앱(`/plugin`이 동작하지 않는 곳): 프롬프트 옆 + → Plugins → Add marketplace에 `hoonmin2-code/usage-status` 입력 → Add plugin.
