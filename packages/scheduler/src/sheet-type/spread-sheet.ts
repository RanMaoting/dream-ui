import EE from '@antv/event-emitter';
import { Store } from '../common/store';
export abstract class SpreadSheet extends EE {
  //     创建一个store来储存临时数据
  public store = new Store();
  // 配置项
  public options: any;
}
