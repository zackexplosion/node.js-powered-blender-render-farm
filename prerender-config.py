import bpy
import os
# for ob in bpy.context.scene.objects:
#     print("object name:  ", ob.data.name)


# print("FPS", bpy.context.scene.render.fps)

# print("FPS", bpy.context.scene.render.fps_base)

# print("use_overwrite", bpy.context.scene.render.use_overwrite)

bpy.context.scene.render.use_overwrite = False

bpy.ops.wm.save_mainfile()

print("Path",bpy.data.filepath)

import json

data = {
  'fps': bpy.context.scene.render.fps
}

dirPath = os.path.dirname(bpy.context.blend_data.filepath)
dirName = bpy.path.basename(bpy.context.blend_data.filepath).split('.')[0]
configPath = os.path.join(dirPath, dirName, 'config.json')
# breakpoint()
with open(configPath, 'w') as outfile:
    json.dump(data, outfile)