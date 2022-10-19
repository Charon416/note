/**
 *  @description canvas元素 => base64格式图片
 */
const canvas = document.getElementById('canvas');
const dataURL = canvas.toDataURL();
console.log(dataURL);
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"

/**
 * @description base64图片 => 下载到本地
 */
const bg = bg.replace(/^data:image\/\w+;base64,/, "");
const bgDataBuffer = Buffer.from(bg, "base64")

FileSystem.writeFileSync(path.resolve(__dirname, "bg.png"), bgDataBuffer)
