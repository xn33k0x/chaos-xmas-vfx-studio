const dy = Math.cos(phase * 1.13) * shake * 0.62;

      ctx.clearRect(0, 0, W, H);
      if (video.readyState >= 2) {
        ctx.drawImage(video, dx, dy, W, H);
      } else {
        ctx.fillStyle = '#080510';
        ctx.fillRect(0, 0, W, H);
      }

      // Neon architectural Christmas lights, preserving the original scene windows.
      if (lightsIntensity > 0 && ((t >= 9.5 && t <= 45.5) || (t >= 75.5 && t <= 109.5))) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const colors = ['#ff2442', '#22c55e', '#ffd166', '#00f0ff', '#ec4899'];
        for (let i = 0; i < 160; i++) {
          const x = i % 2 === 0 ? ((i * 37) % 360) + 20 : W - (((i * 41) % 360) + 20);
          const y = ((i * 53) % 370) + 40;
          const pulse = 0.5 + 0.28 * Math.sin(t * 5 + i) + bass * 0.42;
          ctx.fillStyle = colors[i % colors.length];
          ctx.globalAlpha = Math.max(0, Math.min(1, pulse * 0.72 * lightsIntensity));
          ctx.beginPath();
          ctx.arc(x, y, 2.3 + bass * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Beat-drop reboot crown and hand lightning.
      if (doodlesIntensity > 0 && t >= 39 && t <= 45.5) {
        const j = Math.floor(t * 12);
        const jx = (n) => Math.sin(j * 19.3 + n * 7.1) * 4 * doodlesIntensity;
        const jy = (n) => Math.cos(j * 23.7 + n * 5.3) * 4 * doodlesIntensity;
        const cx = 640 + jx(1);
        const cy = 115 + jy(1);
        drawNeonLine([
          [cx - 58, cy + 28], [cx - 70, cy - 20], [cx - 28, cy + 6],
          [cx, cy - 30], [cx + 28, cy + 6], [cx + 70, cy - 20], [cx + 58, cy + 28]
        ], '#ffd166', 4, true, 24);
        drawNeonLine([[445 + jx(2),340 + jy(2)],[345 + jx(3),265 + jy(3)],[385 + jx(4),255 + jy(4)],[265 + jx(5),175 + jy(5)]], '#22c55e', 3.5, false, 18);
        drawNeonLine([[835 + jx(6),340 + jy(6)],[935 + jx(7),265 + jy(7)],[895 + jx(8),255 + jy(8)],[1015 + jx(9),175 + jy(9)]], '#ec4899', 3.5, false, 18);
      }

      // Finale accents: keep the existing X marks and lightning around the streamer.
      if (doodlesIntensity > 0 && t >= 109.5 && t <= 143) {
        const j = Math.floor(t * 12);
        const jx = (n) => Math.sin(j * 19.3 + n * 7.1) * 3.5 * doodlesIntensity;
        const jy = (n) => Math.cos(j * 23.7 + n * 5.3) * 3.5 * doodlesIntensity;
        drawNeonLine([[445+jx(1),220+jy(1)],[395+jx(2),150+jy(2)],[425+jx(3),145+jy(3)],[370+jx(4),85+jy(4)]], '#22c55e', 3.2, false, 17);
        drawNeonLine([[835+jx(5),220+jy(5)],[885+jx(6),150+jy(6)],[855+jx(7),145+jy(7)],[910+jx(8),85+jy(8)]], '#ec4899', 3.2, false, 17);
        const marks = [[355,290,'#ec4899'],[925,290,'#22c55e'],[340,540,'#22c55e'],[940,540,'#ec4899']];
        marks.forEach(([x,y,color],i) => {
          drawNeonLine([[x-12+jx(i),y-12+jy(i)],[x+12+jx(i),y+12+jy(i)]], color, 3, false, 16);
          drawNeonLine([[x+12+jx(i),y-12+jy(i)],[x-12+jx(i),y+12+jy(i)]], color, 3, false, 16);
        });
      }

      // Requested final POP: one unmistakable glowing snowflake, followed by drifting flakes.
      // Kept in the last second so it replaces the pop symbol, not the surrounding footage.
      if (snowflakeIntensity > 0 && t >= 142.75 && t <= 144) {
        const p = Math.max(0, Math.min(1, (t - 142.75) / 0.42));
        const eased = 1 - Math.pow(1 - p, 3);
        const pulse = 1 + 0.08 * Math.sin((t - 142.75) * 34);
        const radius = (8 + 44 * eased) * pulse * snowflakeIntensity;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        // A short radial glow makes the snowflake read clearly at the impact.
        const glow = ctx.createRadialGradient(640, 360, 2, 640, 360, radius * 2.4);
        glow.addColorStop(0, 'rgba(220,248,255,0.62)');
        glow.addColorStop(0.45, 'rgba(110,210,255,0.20)');
        glow.addColorStop(1, 'rgba(110,210,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(640, 360, radius * 2.4, 0, Math.PI * 2);
        ctx.fill();
        drawSnowflake(640, 360, radius, (t - 142.75) * 0.45, 0.98);
        for (let i = 0; i < 18; i++) {
          const angle = (i / 18) * Math.PI * 2 + 0.18;
          const distance = 18 + eased * 115 + (i % 3) * 9;
          const x = 640 + Math.cos(angle) * distance;
          const y = 360 + Math.sin(angle) * distance;
          const r = 4 + (i % 4) * 1.5;
          drawSnowflake(x, y, r, -angle, Math.max(0.15, 0.9 - eased * 0.45));
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(render);
    };

    const onPlay = () => { connectAudio(); };
    video.addEventListener('play', onPlay);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener('play', onPlay);
      try { source?.disconnect(); analyser?.disconnect(); } catch (_) {}
      if (audioContext && audioContext.state !== 'closed') audioContext.close();
    };
  }, [lightsIntensity, doodlesIntensity, snowflakeIntensity]);

  return (
    <ClientOnly fallback={<div className="aspect-video w-full rounded-2xl bg-black" />}>
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          playsInline
          crossOrigin="anonymous"
          className="hidden"
        />
        <canvas
          ref={canvasRef}
          className="block h-full w-full object-contain"
          aria-label="Kass Christmas VFX video player"
        />
      </div>
    </ClientOnly>
  );
}
