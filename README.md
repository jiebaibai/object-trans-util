# object-util
transformNestedToSimple ：把 {a:{b:{c:222, d:222}, f: 3333}} 嵌套对象转换为：
{"a.b.c" : 222, ”a.b.d“ : 222，”a.f“: 3333}；


transformSimpleToNested: 把 {"a.b.c" : 222, ”a.b.d“ : 222，”a.f“: 3333} 转换为 {a:{b:{c:222, d:222}, f: 3333}}