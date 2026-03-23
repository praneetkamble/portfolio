$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$sequences = @("hover_projects", "hover_projects_loop", "hover_contact", "hover_contact_loop")

foreach ($seq in $sequences) {
    $inputVideo = "src\assets\Video\$seq.mp4"
    $outputDir = "public\avatar\$seq"

    Write-Host "=== Processing $seq (Speeding up 8s to 3s by extracting 9fps) ===" -ForegroundColor Cyan

    # Clean the existing frames
    Remove-Item "$outputDir\*.webp" -Force -ErrorAction SilentlyContinue
    Remove-Item "$outputDir\*.tmp.webp" -Force -ErrorAction SilentlyContinue 
    Remove-Item "$outputDir\*.png" -Force -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

    # Extract 9 frames per second across the FULL 8-second video.
    # 8 seconds * 9 fps = 72 frames total. NO CROP!
    # When Hero.js plays these 72 frames at 24 FPS, the entire 8-second action runs in exactly 3 seconds.
    ffmpeg -i $inputVideo -vf "colorkey=0x00b140:0.25:0.05,format=rgba,scale=-1:500,fps=9" "$outputDir\frame_%03d.png" -y

    # Convert PNGs to WebP
    Get-ChildItem "$outputDir\*.png" | ForEach-Object {
        $out = $_.FullName -replace '\.png$', '.webp'
        ffmpeg -i $_.FullName -quality 75 -lossless 0 $out -y 2>$null
    }
    
    # Clean up PNG frames
    Remove-Item "$outputDir\*.png" -Force -ErrorAction SilentlyContinue

    $c = (Get-ChildItem "$outputDir\*.webp").Count
    $s = [math]::Round((Get-ChildItem "$outputDir\*.webp" | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
    Write-Host "Done: $c frames, $s MB" -ForegroundColor Green
}

Write-Host "`nAll done!" -ForegroundColor Yellow
