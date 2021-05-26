/**
 * 友盟统计相关逻辑
 */

interface CZC {
  push: (list: any[]) => void;
}

/* 
 todo 把 id 改成自己站点的 id
*/
const id = "1279949406";

export async function visit() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = `https://s4.cnzz.com/z_stat.php?id=${id}&web_id=${id}`;
    script.type = "text/javascript";
    document.body.appendChild(script);
    script.onload = resolve;
  }).then(() => {
    const window_ = (window as unknown) as Window &
      typeof globalThis & { _czc: CZC };
    window_._czc.push(["_setAccount", `${id}`]);
  });
}

/**
 * 触发友盟统计事件
 * @param category 事件类别，必填项，表示事件发生在谁身上，如“视频”、“小说”、“轮显层”等等
 * @param action 事件操作，必填项，表示访客跟元素交互的行为动作，如”播放”、”收藏”、”翻层”等等
 * @param label 事件标签，选填项，用于更详细的描述事件，从各个方面都可以，比如具体是哪个视频，哪部小说，翻到了第几层等等
 * @param value 事件值，选填项，整数型，用于填写打分型事件的分值，加载时间型事件的时长，订单型事件的价格等等
 */
export function trigger(
  category: string,
  action: string,
  label?: string,
  value?: number
) {
  const window_ = (window as unknown) as Window &
    typeof globalThis & { _czc: CZC };
  window_._czc.push([
    "_trackEvent",
    category,
    action,
    label,
    value,
  ]);
}
