import sys,json
from PIL import Image
d,dev,v,outp=sys.argv[1:5];games=json.load(open(d+'/games.json'))
ims=[Image.open(f"{d}/{g['id']}-{dev}-{v}.jpg") for g in games]
w,h=ims[0].size;s=0.33 if dev=='tablet' else 0.5;cols=6 if dev=='tablet' else 8
tw,th=int(w*s),int(h*s);rows=(len(ims)+cols-1)//cols
M=Image.new('RGB',(cols*tw,rows*th),'white')
for i,im in enumerate(ims):M.paste(im.resize((tw,th)),((i%cols)*tw,(i//cols)*th))
M.save(outp,quality=85)
