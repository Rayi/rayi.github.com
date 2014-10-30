---
title: 如何在Yii中使用smarty模版
---

## 场景

Yii本身有自己的一套viewRender的，但是很多同学可能习惯了使用smarty，那么我们期望能在Yii中也使用smarty的话， 我们就需要做一些处理了。

## 方法一

你可以使用别人已经写好的Yii插件，比如 smarty-renderer, 当然这个插件的介绍上是有点问题的，而他的文档里面也没有说明如何使用。所以如果你选择使用这个插件的话，就随便看一下他的文档吧。然后按照下面的介绍去做。

首先我们先从github上下载他的打包好的文件zip包，然后解压缩，将解压后的文件夹中的拷贝到你的Yii项目的 protected/plugins 目录下。

然后我们去下载 smarty 并解压文件，将解压文件夹里的libs文件夹下的文件拷贝到你的Yii项目的 protected/vendors/Smarty 目录下。

然后就是在你的配置文件 protected/config/main.php 文件中，找到conponents 这个配置项,并在里面加上以下内容:

```php
'viewRenderer'=>array(
    'class'=>'application.extensions.ESmartyViewRenderer',
    'fileExtension' => '.tpl',
)
```

OK,到了这一步，你就已经可以在Controller中这么使用了：

{% highlight php %}
Yii::app()->viewRenderer->renderFile($this,'./protected/views/snippets/smarty.tpl',$data, false);
{% endhighlight %}

当然，我很吐槽上面这种调用调用方法，而且这也不是我期望的调用方式。我所期望的是这么去写：

{% highlight php %}
$this->render('smarty.tpl', $data);
{% endhighlight %}

所以，要想达到我们的目的，我们需要对在iController类基础上进行一下对render方法的处理，同时你也稍微需要改造一下写好的那些Controller。

### 开始改造

其实我们的目标是期望对render方法进行重写以达到我们的目的，那么我们首先需要在 protected/components 目录下创建一个文件 Controller.php, 文件里的内容如下：

{% highlight php %}
class Controller extends CController
{
    public function render($view, $data = NULL, $return = false)
    {
        // 这里你可以参考 framework/web/CController文件里的render部分的处理，可以处理更多逻辑
        // 你也可以在这里处理一些关于$view的路径部分的操作，以达到更个性化的目的
        $view = './protected/tpl/'.$view;
        Yii::app()->viewRenderer->renderFile($this, $view, $data, $return);
    }
}
{% endhighlight %}

这样，我们就可以用我们上面说的调用 $this->render 了，同时，模版路径会指向到 protected/tpl/smarty.tpl 文件。

## 方法二
其实就是你自己按照方法一里的 plugin 的 写法，自行写一个插件即可，哈哈，是不是有点上当的感觉。 嗯。。。其实我也觉得我开始写的时候标题写错了，写到这里才发现其实就是自己写插件嘛。。。

## 后记
以上内容仅为抛砖引玉，大家可以根据自己的需要处理更强大的功能。

我作为一个没怎么使用PHP的前端，各位PHP大牛看到此文后可以笑而不语的路过，欢迎指正和提出更好的方法~~~