import EE from '@antv/event-emitter';
import { Store } from '../common/store';
import { Canvas, Event as CanvasEvent, type IGroup } from '@antv/g';
export abstract class SpreadSheet extends EE {
  //     创建一个store来储存临时数据
  public store = new Store();
  // 数据配置项
  public dataCfg: any;
  // 配置项
  public options: any;
  //   canvas实例对象
  public container: Canvas;
  //   背景组
  public backgroundGroup: IGroup;
  // 交叉单元格的组
  public panelGroup: IGroup;
}
