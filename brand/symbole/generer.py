# Generateur du symbole LRC 2a (chaine fermee, sans entrelacs, tout marine). TK-398.
# Les SVG font foi ; dans le depot, les PNG et l'ICO en sont rendus par `npm run brand` (sharp).
import math
M='#131e61';C='#f6f5f5'
ASPECT=24/13      # longueur / hauteur des maillons (proportions de la planche de duel)
RATIO_R=1.0       # distance au centre / hauteur du maillon
def centerline(cx,cy,L,H,rot,n=720):
    r=H/2;s=L/2-r;per=4*s+2*math.pi*r;pts=[]
    c,sn=math.cos(math.radians(rot)),math.sin(math.radians(rot))
    for i in range(n):
        d=per*i/n
        if d<2*s: x,y=-s+d,-r
        elif d<2*s+math.pi*r: t=(d-2*s)/r; x,y=s+r*math.sin(t),-r*math.cos(t)
        elif d<4*s+math.pi*r: x,y=s-(d-2*s-math.pi*r),r
        else: t=(d-4*s-math.pi*r)/r; x,y=-s-r*math.sin(t),r*math.cos(t)
        pts.append((cx+x*c-y*sn,cy+x*sn+y*c))
    return pts
def layout(H,R):
    return [(R*math.cos(math.radians(-90+k*120)),R*math.sin(math.radians(-90+k*120)),H*ASPECT,H,k*120) for k in range(3)]
def mindist(H,R):
    a=centerline(*layout(H,R)[0],n=360);b=centerline(*layout(H,R)[1],n=360)
    return min(math.dist(p,q) for p in a[::2] for q in b[::2])
def solve(stroke,gap,extent):
    """Hauteur H et rayon R (unites finales) pour un jour 'gap' entre maillons et une emprise totale 'extent'."""
    H=10.0
    for _ in range(30):
        lo,hi=H*0.6,H*1.6
        for _ in range(40):
            R=(lo+hi)/2
            if mindist(H,R)-stroke<gap: lo=R
            else: hi=R
        pts=[p for l in layout(H,R) for p in centerline(*l,n=240)]
        xs=[p[0] for p in pts];ys=[p[1] for p in pts]
        span=max(max(xs)-min(xs),max(ys)-min(ys))+stroke
        H*=extent/span
    pts=[p for l in layout(H,R) for p in centerline(*l,n=240)]
    ys=[p[1] for p in pts];xs=[p[0] for p in pts]
    return H,R,(max(xs)+min(xs))/2,(max(ys)+min(ys))/2
def symbol_svg(size_vb,stroke,gap,extent,color=M,bg=None,title=True):
    H,R,ox,oy=solve(stroke,gap,extent)
    c=size_vb/2
    rects=''
    for cx,cy,L,Hh,rot in layout(H,R):
        X=c+cx-ox;Y=c+cy-oy
        rects+=f'<rect x="{X-L/2:.3f}" y="{Y-Hh/2:.3f}" width="{L:.3f}" height="{Hh:.3f}" rx="{Hh/2:.3f}" transform="rotate({rot} {X:.3f} {Y:.3f})"/>'
    b=f'<rect width="{size_vb}" height="{size_vb}" fill="{bg}"/>' if bg else ''
    t='<title>Luc Rousseau Consulting</title>' if title else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size_vb} {size_vb}" role="img">{t}{b}'
            f'<g fill="none" stroke="{color}" stroke-width="{stroke}">{rects}</g></svg>\n')
# Poids optiques : maitre fin, petites tailles epaissies, jour minimal d'un pixel environ
# Variante A6 retenue par Luc le 2026-10-05 : jour net entre les maillons, egal a 1,2 fois le trait.
# Poids optiques : maitre fin ; 32 et 16 px epaissis, jour garde lisible (au moins 1 px a 16 px).
J=1.2
SPECS={
 'lrc-symbole.svg':          dict(size_vb=64,stroke=3.0,gap=3.0*J,extent=56),
 'lrc-symbole-blanc.svg':    dict(size_vb=64,stroke=3.0,gap=3.0*J,extent=56,color=C),
 'lrc-symbole-32.svg':       dict(size_vb=32,stroke=2.1,gap=2.0,extent=30.5),
 'lrc-symbole-16.svg':       dict(size_vb=16,stroke=1.4,gap=2.1,extent=16),
 'apple-touch-icon.svg':     dict(size_vb=180,stroke=7.2,gap=7.2*J,extent=118,bg=C),
 'android-chrome-192.svg':   dict(size_vb=192,stroke=7.4,gap=7.4*J,extent=114,bg=C),
 'android-chrome-512.svg':   dict(size_vb=512,stroke=19.5,gap=19.5*J,extent=304,bg=C),
 'linkedin-avatar-400.svg':  dict(size_vb=400,stroke=15,gap=15*J,extent=226,bg=C),
}
if __name__=='__main__':
    import os
    d=os.path.dirname(os.path.abspath(__file__))
    for name,kw in SPECS.items():
        open(os.path.join(d,name),'w').write(symbol_svg(**kw))
    print('ok')
