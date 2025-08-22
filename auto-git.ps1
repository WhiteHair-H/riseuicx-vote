# auto-git.ps1
param(
  [string]$msg = "자동 커밋"
)

# auto-git.ps1 파일은 제외하고 변경된 파일만 add
$changed = git status --porcelain | Where-Object { $_ -notmatch 'auto-git.ps1' }
if ($changed) {
  git add .
  git reset auto-git.ps1
  git commit -m $msg
  git push
} else {
  Write-Host "변경된 파일이 없습니다."
}
