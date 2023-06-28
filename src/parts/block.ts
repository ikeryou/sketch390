import { MyDisplay } from "../core/myDisplay";
import { Func } from "../core/func";
import { Tween } from "../core/tween";
import { SvhGetter } from "../core/svhGetter";
import { Conf } from "../core/conf";
import { Color } from "three";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Block extends MyDisplay {

  private _id: number
  private _inner: HTMLElement
  private _txt: HTMLElement
  private _txtBg: HTMLElement
  private _photo: HTMLElement

  constructor(opt:any) {
    super(opt)

    this._id = opt.id

    // sticky要素
    const inner = document.createElement('div')
    inner.classList.add('l-block-inner')
    this.el.appendChild(inner)
    this._inner = inner

    const photo = document.createElement('div')
    photo.classList.add('l-block-photo')
    inner.appendChild(photo)
    this._photo = photo

    const bg = document.createElement('div')
    photo.appendChild(bg)
    bg.classList.add('l-block-bg')
    this._txtBg = bg
    this.useGPU(this._txtBg)

    const txt = document.createElement('div')
    photo.appendChild(txt)
    this._txt = txt
    this._txt.classList.add('l-block-txt')

    const colA = new Color(0x0000ff)
    const colB = new Color(0xff0000)
    const col = colA.lerp(colB, Util.map(Math.sin(Util.radian(this._id * 30)), 0, 1, -1, 1))
    Tween.set(this._txtBg, {
      border: `10px double ${col.getStyle()}`,
      backgroundColor: '#000000',
      // backgroundColor: col.getStyle(),
    })
  }


  protected _update(): void {
    super._update();

    const sw = Func.sw()
    const sh = SvhGetter.instance.val * 1

    const it = 1

    let w = sw / it
    let h = sh
    const blockHeight = (h / Conf.NUM_IMG) * 1

    Tween.set(this.el, {
      marginTop: blockHeight * 30 * (this._id + 1),
      height: blockHeight * 30 * Conf.NUM_IMG
    })

    Tween.set(this._inner, {
      top: this._id * blockHeight,
      // height: sh
    })

    Tween.set(this._photo, {
      width: w,
      height: blockHeight * 1,
      x: w * (this._id % it),
    })

    Tween.set(this._txt, {
      width: w,
      height: blockHeight,
    })

    Tween.set(this._txtBg, {
      // scaleX: Util.map(Math.sin(Util.radian(this._c * 2 + this._id * 10)), 0.1, 0.75, -1, 1),
      // rotationZ: this._id * 3,
      rotationZ: this._id * 0 + Math.sin(Util.radian(this._c * 1 + this._id * 1)) * 45,
      // rotationZ: Util.map(s, 0, 180, (sh * Conf.NUM_IMG) * this._id, (sh * Conf.NUM_IMG) * this._id + (sh * Conf.NUM_IMG)),
      x: Math.sin(Util.radian(this._c * 1 + this._id * 3)) * w * 0.1,
      scaleX: 0.75
    })
  }

  protected _resize(): void {
    super._resize();
  }
}