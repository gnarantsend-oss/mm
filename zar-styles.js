export const ZAR_CSS = `
.ad-video-box { display: block; width: 100%; border-radius: 10px; overflow: hidden; position: relative; border: 1px solid rgba(212,175,55,0.3); box-shadow: 0 6px 24px rgba(0,0,0,0.6); text-decoration: none; background: #000; transition: box-shadow 0.3s; }
.ad-video-box:hover { box-shadow: 0 8px 32px rgba(212,175,55,0.25); }
.ad-video-box video { width: 100%; height: 150px; object-fit: cover; display: block; }
@media (min-width: 600px) { .ad-video-box video { height: 180px; } }
@media (min-width: 1024px) { .ad-video-box video { height: 200px; } }
.ad-img-box { display: block; width: 100%; border-radius: 10px; overflow: hidden; position: relative; border: 1px solid rgba(212,175,55,0.3); box-shadow: 0 6px 24px rgba(0,0,0,0.6); text-decoration: none; background: #000; transition: transform 0.3s, box-shadow 0.3s; }
.ad-img-box:hover { transform: scale(1.01); box-shadow: 0 8px 32px rgba(212,175,55,0.25); }
.ad-img-box img { width: 100%; height: 150px; object-fit: cover; display: block; }
@media (min-width: 600px) { .ad-img-box img { height: 180px; } }
@media (min-width: 1024px) { .ad-img-box img { height: 200px; } }
.ad-link-box { display: flex; align-items: center; justify-content: space-between; width: 100%; min-height: 76px; border-radius: 10px; padding: 14px 20px; box-sizing: border-box; background: linear-gradient(120deg, #0c0c0c 0%, #1c1500 55%, #0c0c0c 100%); border: 1px solid rgba(212,175,55,0.35); box-shadow: 0 4px 20px rgba(0,0,0,0.5); position: relative; overflow: hidden; gap: 12px; transition: border-color 0.3s, box-shadow 0.3s; }
.ad-link-box::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(212,175,55,0.025) 30px, rgba(212,175,55,0.025) 60px); pointer-events: none; }
.ad-link-box:hover { border-color: rgba(212,175,55,0.65); box-shadow: 0 6px 28px rgba(212,175,55,0.18); }
.ad-link-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
.ad-badge { background: linear-gradient(135deg, #c9a800, #f0d060); color: #000; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 4px; letter-spacing: 1.5px; white-space: nowrap; flex-shrink: 0; font-family: 'Oswald', 'Inter', sans-serif; box-shadow: 0 2px 8px rgba(212,175,55,0.35); }
.ad-link-texts { min-width: 0; }
.ad-link-title { font-size: 14px; font-weight: 600; color: #D4AF37; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ad-link-sub { font-size: 11px; color: rgba(212,175,55,0.45); margin-top: 2px; }
.ad-goto-btn { display: inline-flex; align-items: center; gap: 7px; background: linear-gradient(135deg, #c9a800, #f0d060); color: #000; font-weight: 800; font-size: 13px; padding: 10px 18px; border-radius: 7px; text-decoration: none; white-space: nowrap; flex-shrink: 0; letter-spacing: 0.8px; font-family: 'Oswald', 'Inter', sans-serif; box-shadow: 0 4px 14px rgba(212,175,55,0.3); transition: transform 0.2s, box-shadow 0.2s; position: relative; z-index: 1; }
.ad-goto-btn:hover { transform: scale(1.05); box-shadow: 0 6px 20px rgba(212,175,55,0.5); }
.ad-corner-badge { position: absolute; top: 8px; left: 10px; background: linear-gradient(135deg, #c9a800, #f0d060); color: #000; font-size: 10px; font-weight: 800; padding: 3px 9px; border-radius: 4px; letter-spacing: 1.5px; pointer-events: none; font-family: 'Oswald', 'Inter', sans-serif; box-shadow: 0 2px 6px rgba(0,0,0,0.4); z-index: 5; }
.ad-empty-box { display: flex; align-items: center; justify-content: space-between; width: 100%; min-height: 76px; border-radius: 10px; padding: 14px 20px; box-sizing: border-box; background: linear-gradient(120deg, #0c0c0c 0%, #1a1400 55%, #0c0c0c 100%); border: 1.5px dashed rgba(212,175,55,0.3); gap: 12px; transition: border-color 0.3s; }
.ad-empty-box:hover { border-color: rgba(212,175,55,0.55); }
.ad-phone-btn { display: inline-flex; align-items: center; gap: 7px; background: linear-gradient(135deg, #c9a800, #f0d060); color: #000; font-weight: 800; font-size: 14px; padding: 10px 20px; border-radius: 7px; text-decoration: none; white-space: nowrap; flex-shrink: 0; font-family: 'Oswald', 'Inter', sans-serif; box-shadow: 0 4px 14px rgba(212,175,55,0.3); letter-spacing: 0.5px; transition: transform 0.2s, box-shadow 0.2s; }
.ad-phone-btn:hover { transform: scale(1.05); box-shadow: 0 6px 20px rgba(212,175,55,0.5); }
@media (max-width: 480px) { .ad-link-box, .ad-empty-box { padding: 12px 14px; } .ad-link-title { font-size: 12px; } .ad-goto-btn, .ad-phone-btn { font-size: 12px; padding: 8px 13px; } .ad-badge { font-size: 10px; padding: 3px 7px; } }
/* ── AdBlock Wall ──────────────────────────────────────────── */
#_adblock_wall {
  position: fixed; inset: 0; z-index: 999999;
  background: rgba(0,0,0,0.97);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; box-sizing: border-box;
  backdrop-filter: blur(8px);
}
._abw-box {
  background: linear-gradient(145deg, #111 0%, #1a1200 100%);
  border: 1.5px solid rgba(212,175,55,0.45);
  border-radius: 16px;
  padding: 40px 36px;
  max-width: 520px; width: 100%;
  text-align: center;
  box-shadow: 0 0 60px rgba(212,175,55,0.12), 0 20px 60px rgba(0,0,0,0.8);
  animation: _abw-in 0.4s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes _abw-in {
  from { opacity:0; transform: scale(0.85) translateY(20px); }
  to   { opacity:1; transform: scale(1)   translateY(0);     }
}
._abw-icon { font-size: 56px; margin-bottom: 12px; }
._abw-title {
  font-size: 26px; font-weight: 800; color: #D4AF37;
  font-family: 'Oswald', sans-serif; letter-spacing: 1px;
  margin: 0 0 14px;
}
._abw-desc {
  color: rgba(255,255,255,0.75); font-size: 15px; line-height: 1.6;
  margin: 0 0 24px;
}
._abw-desc strong { color: #f0d060; }
._abw-steps {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(212,175,55,0.15);
  border-radius: 10px; padding: 18px 20px;
  margin-bottom: 28px; text-align: left;
  display: flex; flex-direction: column; gap: 14px;
}
._abw-step {
  display: flex; align-items: flex-start; gap: 14px;
  color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.5;
}
._abw-step strong { color: #f0d060; }
._abw-num {
  min-width: 28px; height: 28px;
  background: linear-gradient(135deg,#c9a800,#f0d060);
  color: #000; font-weight: 800; font-size: 13px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-family: 'Oswald', sans-serif;
}
._abw-btn {
  background: linear-gradient(135deg,#c9a800,#f0d060);
  color: #000; font-weight: 800; font-size: 16px;
  padding: 14px 36px; border-radius: 10px; border: none;
  cursor: pointer; font-family: 'Oswald', sans-serif;
  letter-spacing: 0.8px; width: 100%;
  box-shadow: 0 6px 24px rgba(212,175,55,0.35);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 14px;
}
._abw-btn:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 32px rgba(212,175,55,0.55);
}
._abw-note {
  color: rgba(255,255,255,0.35); font-size: 12px; margin: 0;
}
@media (max-width: 480px) {
  ._abw-box { padding: 28px 20px; }
  ._abw-title { font-size: 22px; }
  ._abw-icon { font-size: 44px; }
}

`;
