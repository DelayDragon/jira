目前仍未解决的问题

### 依赖耦合问题

1、尝试使用 commitlint，会导致整个项目的依赖发生改变，导致项目不能正常运作；
初步想法：在项目初期就要事先配置好，以免中后期对项目会有所影响；这个库如今再安装使用貌似会对项目产生较大影响，对于它的尝试使用，将在新的项目中使用；

### 第三方库对函数的处理

2、看板 list 的 react-beautiful-dnd 库的拖拽效果无法实现；
初步想法：问题出现同样应该是依赖库的问题，看到某些想法可能涉及 emotion 与 react-beautiful-dnd 对 forwordRef 的处理问题；emotion 可能会对 forwordRef 转发进行处理，导致不能 react-beautiful-dnd 不能正常识别；

###

1.Trying to use commitlint will change the dependencies of the entire project and cause the project to fail to function properly;
solution: Configure as much as possible in the initial stage of the project, to avoid it could affect project of the
later stage; the installation and use of this library now seems to have a great impact on the project, and its trial use will be used in new projects.

###

2.The drag-and-drop effect of the react-beautiful-dnd library of Kanban list cannot be realized.
Preliminary idea: the problem should also be dependent on the library. See that some ideas may involve the handling of forwordRef by emotion and react-beautiful-dnd; emotion may handle forwordRef forwarding, so that the react-beautiful-dnd cannot recognize it properly.
