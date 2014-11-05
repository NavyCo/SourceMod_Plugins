/* http://prismjs.com/download.html?themes=prism-coy&languages=markup+css+css-extras+clike+javascript+java+scss+bash+c+cpp+python+http+ruby+csharp+go+aspnet+autohotkey+ini+git&plugins=line-highlight+line-numbers+autolinker+file-highlight+show-language */
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope &&
    self instanceof WorkerGlobalScope ? self : {};
var Prism = function() {
    var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
        t = self.Prism = {
            util: {
                encode: function(e) {
                    return e instanceof n ? new n(e.type, t.util.encode(
                        e.content), e.alias) : "Array" === t.util.type(
                        e) ? e.map(t.util.encode) : e.replace(/&/g,
                        "&amp;").replace(/</g, "&lt;").replace(
                        /\u00a0/g, " ")
                },
                type: function(e) {
                    return Object.prototype.toString.call(e).match(
                        /\[object (\w+)\]/)[1]
                },
                clone: function(e) {
                    var n = t.util.type(e);
                    switch (n) {
                        case "Object":
                            var a = {};
                            for (var r in e) e.hasOwnProperty(r) && (a[
                                r] = t.util.clone(e[r]));
                            return a;
                        case "Array":
                            return e.slice()
                    }
                    return e
                }
            },
            languages: {
                extend: function(e, n) {
                    var a = t.util.clone(t.languages[e]);
                    for (var r in n) a[r] = n[r];
                    return a
                },
                insertBefore: function(e, n, a, r) {
                    r = r || t.languages;
                    var i = r[e],
                        l = {};
                    for (var o in i)
                        if (i.hasOwnProperty(o)) {
                            if (o == n)
                                for (var s in a) a.hasOwnProperty(s) &&
                                    (l[s] = a[s]);
                            l[o] = i[o]
                        }
                    return r[e] = l
                },
                DFS: function(e, n, a) {
                    for (var r in e) e.hasOwnProperty(r) && (n.call(e,
                            r, e[r], a || r), "Object" === t.util.type(
                            e[r]) ? t.languages.DFS(e[r], n) :
                        "Array" === t.util.type(e[r]) && t.languages
                        .DFS(e[r], n, r))
                }
            },
            highlightAll: function(e, n) {
                for (var a, r = document.querySelectorAll(
                    'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                ), i = 0; a = r[i++];) t.highlightElement(a, e === !0,
                    n)
            },
            highlightElement: function(a, r, i) {
                for (var l, o, s = a; s && !e.test(s.className);) s = s
                    .parentNode;
                if (s && (l = (s.className.match(e) || [, ""])[1], o =
                    t.languages[l]), o) {
                    a.className = a.className.replace(e, "").replace(
                            /\s+/g, " ") + " language-" + l, s = a.parentNode,
                        /pre/i.test(s.nodeName) && (s.className = s.className
                            .replace(e, "").replace(/\s+/g, " ") +
                            " language-" + l);
                    var c = a.textContent;
                    if (c) {
                        var g = {
                            element: a,
                            language: l,
                            grammar: o,
                            code: c
                        };
                        if (t.hooks.run("before-highlight", g), r &&
                            self.Worker) {
                            var u = new Worker(t.filename);
                            u.onmessage = function(e) {
                                g.highlightedCode = n.stringify(
                                        JSON.parse(e.data), l), t.hooks
                                    .run("before-insert", g), g.element
                                    .innerHTML = g.highlightedCode,
                                    i && i.call(g.element), t.hooks
                                    .run("after-highlight", g)
                            }, u.postMessage(JSON.stringify({
                                language: g.language,
                                code: g.code
                            }))
                        } else g.highlightedCode = t.highlight(g.code,
                                g.grammar, g.language), t.hooks.run(
                                "before-insert", g), g.element.innerHTML =
                            g.highlightedCode, i && i.call(a), t.hooks.run(
                                "after-highlight", g)
                    }
                }
            },
            highlight: function(e, a, r) {
                var i = t.tokenize(e, a);
                return n.stringify(t.util.encode(i), r)
            },
            tokenize: function(e, n) {
                var a = t.Token,
                    r = [e],
                    i = n.rest;
                if (i) {
                    for (var l in i) n[l] = i[l];
                    delete n.rest
                }
                e: for (var l in n)
                    if (n.hasOwnProperty(l) && n[l]) {
                        var o = n[l];
                        o = "Array" === t.util.type(o) ? o : [o];
                        for (var s = 0; s < o.length; ++s) {
                            var c = o[s],
                                g = c.inside,
                                u = !!c.lookbehind,
                                f = 0,
                                h = c.alias;
                            c = c.pattern || c;
                            for (var p = 0; p < r.length; p++) {
                                var d = r[p];
                                if (r.length > e.length) break e;
                                if (!(d instanceof a)) {
                                    c.lastIndex = 0;
                                    var m = c.exec(d);
                                    if (m) {
                                        u && (f = m[1].length);
                                        var y = m.index - 1 + f,
                                            m = m[0].slice(f),
                                            v = m.length,
                                            k = y + v,
                                            b = d.slice(0, y + 1),
                                            w = d.slice(k + 1),
                                            N = [p, 1];
                                        b && N.push(b);
                                        var O = new a(l, g ? t.tokenize(
                                            m, g) : m, h);
                                        N.push(O), w && N.push(w),
                                            Array.prototype.splice.apply(
                                                r, N)
                                    }
                                }
                            }
                        }
                    }
                return r
            },
            hooks: {
                all: {},
                add: function(e, n) {
                    var a = t.hooks.all;
                    a[e] = a[e] || [], a[e].push(n)
                },
                run: function(e, n) {
                    var a = t.hooks.all[e];
                    if (a && a.length)
                        for (var r, i = 0; r = a[i++];) r(n)
                }
            }
        },
        n = t.Token = function(e, t, n) {
            this.type = e, this.content = t, this.alias = n
        };
    if (n.stringify = function(e, a, r) {
        if ("string" == typeof e) return e;
        if ("[object Array]" == Object.prototype.toString.call(e))
            return e.map(function(t) {
                return n.stringify(t, a, e)
            }).join("");
        var i = {
            type: e.type,
            content: n.stringify(e.content, a, r),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: a,
            parent: r
        };
        if ("comment" == i.type && (i.attributes.spellcheck = "true"),
            e.alias) {
            var l = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
            Array.prototype.push.apply(i.classes, l)
        }
        t.hooks.run("wrap", i);
        var o = "";
        for (var s in i.attributes) o += s + '="' + (i.attributes[s] ||
            "") + '"';
        return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' +
            o + ">" + i.content + "</" + i.tag + ">"
    }, !self.document) return self.addEventListener ? (self.addEventListener(
        "message", function(e) {
            var n = JSON.parse(e.data),
                a = n.language,
                r = n.code;
            self.postMessage(JSON.stringify(t.util.encode(t.tokenize(
                r, t.languages[a])))), self.close()
        }, !1), self.Prism) : self.Prism;
    var a = document.getElementsByTagName("script");
    return a = a[a.length - 1], a && (t.filename = a.src, document.addEventListener &&
        !a.hasAttribute("data-manual") && document.addEventListener(
            "DOMContentLoaded", t.highlightAll)), self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism);;
Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/g,
    prolog: /<\?.+?\?>/,
    doctype: /<!DOCTYPE.+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
        inside: {
            tag: {
                pattern: /^<\/?[\w:-]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[\w-]+?:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
                inside: {
                    punctuation: /=|>|"/g
                }
            },
            punctuation: /\/?>/g,
            "attr-name": {
                pattern: /[\w:-]+/g,
                inside: {
                    namespace: /^[\w-]+?:/
                }
            }
        }
    },
    entity: /\&#?[\da-z]{1,8};/gi
}, Prism.hooks.add("wrap", function(t) {
    "entity" === t.type && (t.attributes.title = t.content.replace(
        /&amp;/, "&"))
});;
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
        inside: {
            punctuation: /[;:]/g
        }
    },
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
    property: /(\b|\B)[\w-]+(?=\s*:)/gi,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    punctuation: /[\{\};:]/g,
    "function": /[-a-z0-9]+(?=\()/gi
}, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
        inside: {
            tag: {
                pattern: /<style[\w\W]*?>|<\/style>/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        }
    }
});;
Prism.languages.css.selector = {
    pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
    inside: {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,
        "pseudo-class": /:[-\w]+(?:\(.*\))?/g,
        "class": /\.[-:\.\w]+/g,
        id: /#[-:\.\w]+/g
    }
}, Prism.languages.insertBefore("css", "ignore", {
    hexcode: /#[\da-f]{3,6}/gi,
    entity: /\\[\da-f]{1,8}/gi,
    number: /[\d%\.]+/g
});;
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
        lookbehind: !0
    }],
    string: /("|')(\\?.)*?\1/g,
    "class-name": {
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    "function": {
        pattern: /[a-z0-9_]+\(/gi,
        inside: {
            punctuation: /\(/
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
};;
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
}), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
        inside: {
            tag: {
                pattern: /<script[\w\W]*?>|<\/script>/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        }
    }
});;
Prism.languages.java = Prism.languages.extend("clike", {
    keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\W\d*\.?\d+\b/gi,
    operator: {
        pattern: /(^|[^\.])(?:\+=|\+\+?|-=|--?|!=?|<{1,2}=?|>{1,3}=?|==?|&=|&&?|\|=|\|\|?|\?|\*=?|\/=?|%=?|\^=?|:|~)/gm,
        lookbehind: !0
    }
});;
Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi,
    url: /([-a-z]+-)*url(?=\()/gi,
    selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
}), Prism.languages.insertBefore("scss", "atrule", {
    keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i
}), Prism.languages.insertBefore("scss", "property", {
    variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
}), Prism.languages.insertBefore("scss", "ignore", {
    placeholder: /%[-_\w]+/i,
    statement: /\B!(default|optional)\b/gi,
    "boolean": /\b(true|false)\b/g,
    "null": /\b(null)\b/g,
    operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g
});;
Prism.languages.bash = Prism.languages.extend("clike", {
    comment: {
        pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: {
        pattern: /("|')(\\?[\s\S])*?\1/g,
        inside: {
            property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
        }
    },
    keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
}), Prism.languages.insertBefore("bash", "keyword", {
    property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
}), Prism.languages.insertBefore("bash", "comment", {
    important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
});;
Prism.languages.c = Prism.languages.extend("clike", {
    string: /("|')([^\n\\\1]|\\.|\\\r*\n)*?\1/g,
    keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,
    operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\//g
}), Prism.languages.insertBefore("c", "string", {
    property: {
        pattern: /((^|\n)\s*)#\s*[a-z]+([^\n\\]|\\.|\\\r*\n)*/gi,
        lookbehind: !0,
        inside: {
            string: {
                pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/g,
                lookbehind: !0
            }
        }
    }
}), delete Prism.languages.c["class-name"], delete Prism.languages.c[
    "boolean"];;
Prism.languages.cpp = Prism.languages.extend("c", {
    keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,
    "boolean": /\b(true|false)\b/g,
    operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g
}), Prism.languages.insertBefore("cpp", "keyword", {
    "class-name": {
        pattern: /(class\s+)[a-z0-9_]+/gi,
        lookbehind: !0
    }
});;
Prism.languages.python = {
    comment: {
        pattern: /(^|[^\\])#.*?(\r?\n|$)/g,
        lookbehind: !0
    },
    string: /"""[\s\S]+?"""|("|')(\\?.)*?\1/g,
    keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
    "boolean": /\b(True|False)\b/g,
    number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
    operator: /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
};;
Prism.languages.http = {
    "request-line": {
        pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/g,
        inside: {
            property: /^\b(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/g,
            "attr-name": /:\w+/g
        }
    },
    "response-status": {
        pattern: /^HTTP\/1.[01] [0-9]+.*/g,
        inside: {
            property: /[0-9]+[A-Z\s-]+$/g
        }
    },
    keyword: /^[\w-]+:(?=.+)/gm
};
var httpLanguages = {
    "application/json": Prism.languages.javascript,
    "application/xml": Prism.languages.markup,
    "text/xml": Prism.languages.markup,
    "text/html": Prism.languages.markup
};
for (var contentType in httpLanguages)
    if (httpLanguages[contentType]) {
        var options = {};
        options[contentType] = {
            pattern: new RegExp("(content-type:\\s*" + contentType +
                "[\\w\\W]*?)\\n\\n[\\w\\W]*", "gi"),
            lookbehind: !0,
            inside: {
                rest: httpLanguages[contentType]
            }
        }, Prism.languages.insertBefore("http", "keyword", options)
    };
Prism.languages.ruby = Prism.languages.extend("clike", {
    comment: /#[^\r\n]*(\r?\n|$)/g,
    keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
    builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
}), Prism.languages.insertBefore("ruby", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    },
    variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
    symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
});;
Prism.languages.csharp = Prism.languages.extend("clike", {
    keyword: /\b(abstract|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/g,
    string: /@?("|')(\\?.)*?\1/g,
    preprocessor: /^\s*#.*/gm,
    number: /\b-?(0x)?\d*\.?\d+\b/g
});;
Prism.languages.go = Prism.languages.extend("clike", {
    keyword: /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g,
    builtin: /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/g,
    "boolean": /\b(_|iota|nil|true|false)\b/g,
    operator: /([(){}\[\]]|[*\/%^!]=?|\+[=+]?|-[>=-]?|\|[=|]?|>[=>]?|<(<|[=-])?|==?|&(&|=|^=?)?|\.(\.\.)?|[,;]|:=?)/g,
    number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/gi,
    string: /("|'|`)(\\?.|\r|\n)*?\1/g
}), delete Prism.languages.go["class-name"];;
Prism.languages.aspnet = Prism.languages.extend("markup", {
    "page-directive tag": {
        pattern: /<%\s*@.*%>/gi,
        inside: {
            "page-directive tag": /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master|MasterType|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/gi,
            rest: Prism.languages.markup.tag.inside
        }
    },
    "directive tag": {
        pattern: /<%.*%>/gi,
        inside: {
            "directive tag": /<%\s*?[$=%#:]{0,2}|%>/gi,
            rest: Prism.languages.csharp
        }
    }
}), Prism.languages.insertBefore("inside", "punctuation", {
    "directive tag": Prism.languages.aspnet["directive tag"]
}, Prism.languages.aspnet.tag.inside["attr-value"]), Prism.languages.insertBefore(
    "aspnet", "comment", {
        "asp comment": /<%--[\w\W]*?--%>/g
    }), Prism.languages.insertBefore("aspnet", Prism.languages.javascript ?
    "script" : "tag", {
        "asp script": {
            pattern: /<script(?=.*runat=['"]?server['"]?)[\w\W]*?>[\w\W]*?<\/script>/gi,
            inside: {
                tag: {
                    pattern: /<\/?script\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,
                    inside: Prism.languages.aspnet.tag.inside
                },
                rest: Prism.languages.csharp || {}
            }
        }
    }), Prism.languages.aspnet.style && (Prism.languages.aspnet.style.inside
    .tag.pattern =
    /<\/?style\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,
    Prism.languages.aspnet.style.inside.tag.inside = Prism.languages.aspnet
    .tag.inside), Prism.languages.aspnet.script && (Prism.languages.aspnet.script
    .inside.tag.pattern = Prism.languages.aspnet["asp script"].inside.tag.pattern,
    Prism.languages.aspnet.script.inside.tag.inside = Prism.languages.aspnet
    .tag.inside);;
Prism.languages.autohotkey = {
    comment: {
        pattern: /(^[^";\n]*("[^"\n]*?"[^"\n]*?)*)(;.*$|^\s*\/\*[\s\S]*\n\*\/)/gm,
        lookbehind: !0
    },
    string: /"(([^"\n\r]|"")*)"/gm,
    "function": /[^\(\); \t\,\n\+\*\-\=\?>:\\\/<\&%\[\]]+?(?=\()/gm,
    tag: /^[ \t]*[^\s:]+?(?=:[^:])/gm,
    variable: /\%\w+\%/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[\+\-\*\\\/:=\?\&\|<>]/g,
    punctuation: /[\{}[\]\(\):]/g,
    "boolean": /\b(true|false)\b/g,
    selector: /\b(AutoTrim|BlockInput|Break|Click|ClipWait|Continue|Control|ControlClick|ControlFocus|ControlGet|ControlGetFocus|ControlGetPos|ControlGetText|ControlMove|ControlSend|ControlSendRaw|ControlSetText|CoordMode|Critical|DetectHiddenText|DetectHiddenWindows|Drive|DriveGet|DriveSpaceFree|EnvAdd|EnvDiv|EnvGet|EnvMult|EnvSet|EnvSub|EnvUpdate|Exit|ExitApp|FileAppend|FileCopy|FileCopyDir|FileCreateDir|FileCreateShortcut|FileDelete|FileEncoding|FileGetAttrib|FileGetShortcut|FileGetSize|FileGetTime|FileGetVersion|FileInstall|FileMove|FileMoveDir|FileRead|FileReadLine|FileRecycle|FileRecycleEmpty|FileRemoveDir|FileSelectFile|FileSelectFolder|FileSetAttrib|FileSetTime|FormatTime|GetKeyState|Gosub|Goto|GroupActivate|GroupAdd|GroupClose|GroupDeactivate|Gui|GuiControl|GuiControlGet|Hotkey|ImageSearch|IniDelete|IniRead|IniWrite|Input|InputBox|KeyWait|ListHotkeys|ListLines|ListVars|Loop|Menu|MouseClick|MouseClickDrag|MouseGetPos|MouseMove|MsgBox|OnExit|OutputDebug|Pause|PixelGetColor|PixelSearch|PostMessage|Process|Progress|Random|RegDelete|RegRead|RegWrite|Reload|Repeat|Return|Run|RunAs|RunWait|Send|SendEvent|SendInput|SendMessage|SendMode|SendPlay|SendRaw|SetBatchLines|SetCapslockState|SetControlDelay|SetDefaultMouseSpeed|SetEnv|SetFormat|SetKeyDelay|SetMouseDelay|SetNumlockState|SetScrollLockState|SetStoreCapslockMode|SetTimer|SetTitleMatchMode|SetWinDelay|SetWorkingDir|Shutdown|Sleep|Sort|SoundBeep|SoundGet|SoundGetWaveVolume|SoundPlay|SoundSet|SoundSetWaveVolume|SplashImage|SplashTextOff|SplashTextOn|SplitPath|StatusBarGetText|StatusBarWait|StringCaseSense|StringGetPos|StringLeft|StringLen|StringLower|StringMid|StringReplace|StringRight|StringSplit|StringTrimLeft|StringTrimRight|StringUpper|Suspend|SysGet|Thread|ToolTip|Transform|TrayTip|URLDownloadToFile|WinActivate|WinActivateBottom|WinClose|WinGet|WinGetActiveStats|WinGetActiveTitle|WinGetClass|WinGetPos|WinGetText|WinGetTitle|WinHide|WinKill|WinMaximize|WinMenuSelectItem|WinMinimize|WinMinimizeAll|WinMinimizeAllUndo|WinMove|WinRestore|WinSet|WinSetTitle|WinShow|WinWait|WinWaitActive|WinWaitClose|WinWaitNotActive)\b/i,
    constant: /\b(a_ahkpath|a_ahkversion|a_appdata|a_appdatacommon|a_autotrim|a_batchlines|a_caretx|a_carety|a_computername|a_controldelay|a_cursor|a_dd|a_ddd|a_dddd|a_defaultmousespeed|a_desktop|a_desktopcommon|a_detecthiddentext|a_detecthiddenwindows|a_endchar|a_eventinfo|a_exitreason|a_formatfloat|a_formatinteger|a_gui|a_guievent|a_guicontrol|a_guicontrolevent|a_guiheight|a_guiwidth|a_guix|a_guiy|a_hour|a_iconfile|a_iconhidden|a_iconnumber|a_icontip|a_index|a_ipaddress1|a_ipaddress2|a_ipaddress3|a_ipaddress4|a_isadmin|a_iscompiled|a_iscritical|a_ispaused|a_issuspended|a_isunicode|a_keydelay|a_language|a_lasterror|a_linefile|a_linenumber|a_loopfield|a_loopfileattrib|a_loopfiledir|a_loopfileext|a_loopfilefullpath|a_loopfilelongpath|a_loopfilename|a_loopfileshortname|a_loopfileshortpath|a_loopfilesize|a_loopfilesizekb|a_loopfilesizemb|a_loopfiletimeaccessed|a_loopfiletimecreated|a_loopfiletimemodified|a_loopreadline|a_loopregkey|a_loopregname|a_loopregsubkey|a_loopregtimemodified|a_loopregtype|a_mday|a_min|a_mm|a_mmm|a_mmmm|a_mon|a_mousedelay|a_msec|a_mydocuments|a_now|a_nowutc|a_numbatchlines|a_ostype|a_osversion|a_priorhotkey|programfiles|a_programfiles|a_programs|a_programscommon|a_screenheight|a_screenwidth|a_scriptdir|a_scriptfullpath|a_scriptname|a_sec|a_space|a_startmenu|a_startmenucommon|a_startup|a_startupcommon|a_stringcasesense|a_tab|a_temp|a_thisfunc|a_thishotkey|a_thislabel|a_thismenu|a_thismenuitem|a_thismenuitempos|a_tickcount|a_timeidle|a_timeidlephysical|a_timesincepriorhotkey|a_timesincethishotkey|a_titlematchmode|a_titlematchmodespeed|a_username|a_wday|a_windelay|a_windir|a_workingdir|a_yday|a_year|a_yweek|a_yyyy|clipboard|clipboardall|comspec|errorlevel)\b/i,
    builtin: /\b(abs|acos|asc|asin|atan|ceil|chr|class|cos|dllcall|exp|fileexist|Fileopen|floor|getkeystate|il_add|il_create|il_destroy|instr|substr|isfunc|islabel|IsObject|ln|log|lv_add|lv_delete|lv_deletecol|lv_getcount|lv_getnext|lv_gettext|lv_insert|lv_insertcol|lv_modify|lv_modifycol|lv_setimagelist|mod|onmessage|numget|numput|registercallback|regexmatch|regexreplace|round|sin|tan|sqrt|strlen|sb_seticon|sb_setparts|sb_settext|strsplit|tv_add|tv_delete|tv_getchild|tv_getcount|tv_getnext|tv_get|tv_getparent|tv_getprev|tv_getselection|tv_gettext|tv_modify|varsetcapacity|winactive|winexist|__New|__Call|__Get|__Set)\b/i,
    symbol: /\b(alt|altdown|altup|appskey|backspace|browser_back|browser_favorites|browser_forward|browser_home|browser_refresh|browser_search|browser_stop|bs|capslock|control|ctrl|ctrlbreak|ctrldown|ctrlup|del|delete|down|end|enter|esc|escape|f1|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|f2|f20|f21|f22|f23|f24|f3|f4|f5|f6|f7|f8|f9|home|ins|insert|joy1|joy10|joy11|joy12|joy13|joy14|joy15|joy16|joy17|joy18|joy19|joy2|joy20|joy21|joy22|joy23|joy24|joy25|joy26|joy27|joy28|joy29|joy3|joy30|joy31|joy32|joy4|joy5|joy6|joy7|joy8|joy9|joyaxes|joybuttons|joyinfo|joyname|joypov|joyr|joyu|joyv|joyx|joyy|joyz|lalt|launch_app1|launch_app2|launch_mail|launch_media|lbutton|lcontrol|lctrl|left|lshift|lwin|lwindown|lwinup|mbutton|media_next|media_play_pause|media_prev|media_stop|numlock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpadadd|numpadclear|numpaddel|numpaddiv|numpaddot|numpaddown|numpadend|numpadenter|numpadhome|numpadins|numpadleft|numpadmult|numpadpgdn|numpadpgup|numpadright|numpadsub|numpadup|pause|pgdn|pgup|printscreen|ralt|rbutton|rcontrol|rctrl|right|rshift|rwin|rwindown|rwinup|scrolllock|shift|shiftdown|shiftup|space|tab|up|volume_down|volume_mute|volume_up|wheeldown|wheelleft|wheelright|wheelup|xbutton1|xbutton2)\b/i,
    important: /#\b(AllowSameLineComments|ClipboardTimeout|CommentFlag|ErrorStdOut|EscapeChar|HotkeyInterval|HotkeyModifierTimeout|Hotstring|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Include|IncludeAgain|InstallKeybdHook|InstallMouseHook|KeyHistory|LTrim|MaxHotkeysPerInterval|MaxMem|MaxThreads|MaxThreadsBuffer|MaxThreadsPerHotkey|NoEnv|NoTrayIcon|Persistent|SingleInstance|UseHook|WinActivateForce)\b/i,
    keyword: /\b(Abort|AboveNormal|Add|ahk_class|ahk_group|ahk_id|ahk_pid|All|Alnum|Alpha|AltSubmit|AltTab|AltTabAndMenu|AltTabMenu|AltTabMenuDismiss|AlwaysOnTop|AutoSize|Background|BackgroundTrans|BelowNormal|between|BitAnd|BitNot|BitOr|BitShiftLeft|BitShiftRight|BitXOr|Bold|Border|Button|ByRef|Checkbox|Checked|CheckedGray|Choose|ChooseString|Click|Close|Color|ComboBox|Contains|ControlList|Count|Date|DateTime|Days|DDL|Default|Delete|DeleteAll|Delimiter|Deref|Destroy|Digit|Disable|Disabled|DropDownList|Edit|Eject|Else|Enable|Enabled|Error|Exist|Exp|Expand|ExStyle|FileSystem|First|Flash|Float|FloatFast|Focus|Font|for|global|Grid|Group|GroupBox|GuiClose|GuiContextMenu|GuiDropFiles|GuiEscape|GuiSize|Hdr|Hidden|Hide|High|HKCC|HKCR|HKCU|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_LOCAL_MACHINE|HKEY_USERS|HKLM|HKU|Hours|HScroll|Icon|IconSmall|ID|IDLast|If|IfEqual|IfExist|IfGreater|IfGreaterOrEqual|IfInString|IfLess|IfLessOrEqual|IfMsgBox|IfNotEqual|IfNotExist|IfNotInString|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Ignore|ImageList|in|Integer|IntegerFast|Interrupt|is|italic|Join|Label|LastFound|LastFoundExist|Limit|Lines|List|ListBox|ListView|Ln|local|Lock|Logoff|Low|Lower|Lowercase|MainWindow|Margin|Maximize|MaximizeBox|MaxSize|Minimize|MinimizeBox|MinMax|MinSize|Minutes|MonthCal|Mouse|Move|Multi|NA|No|NoActivate|NoDefault|NoHide|NoIcon|NoMainWindow|norm|Normal|NoSort|NoSortHdr|NoStandard|Not|NoTab|NoTimers|Number|Off|Ok|On|OwnDialogs|Owner|Parse|Password|Picture|Pixel|Pos|Pow|Priority|ProcessName|Radio|Range|Read|ReadOnly|Realtime|Redraw|REG_BINARY|REG_DWORD|REG_EXPAND_SZ|REG_MULTI_SZ|REG_SZ|Region|Relative|Rename|Report|Resize|Restore|Retry|RGB|Right|Screen|Seconds|Section|Serial|SetLabel|ShiftAltTab|Show|Single|Slider|SortDesc|Standard|static|Status|StatusBar|StatusCD|strike|Style|Submit|SysMenu|Tab|Tab2|TabStop|Text|Theme|Tile|ToggleCheck|ToggleEnable|ToolWindow|Top|Topmost|TransColor|Transparent|Tray|TreeView|TryAgain|Type|UnCheck|underline|Unicode|Unlock|UpDown|Upper|Uppercase|UseErrorLevel|Vis|VisFirst|Visible|VScroll|Wait|WaitClose|WantCtrlA|WantF2|WantReturn|While|Wrap|Xdigit|xm|xp|xs|Yes|ym|yp|ys)\b/i
};;
Prism.languages.ini = {
    comment: /^\s*;.*$/gm,
    important: /\[.*?\]/gm,
    constant: /^\s*[^\s\=]+?(?=[ \t]*\=)/gm,
    "attr-value": {
        pattern: /\=.*/gm,
        inside: {
            punctuation: /^[\=]/g
        }
    }
};;
Prism.languages.git = {
    comment: /^#.*$/m,
    string: /("|')(\\?.)*?\1/gm,
    command: {
        pattern: /^.*\$ git .*$/m,
        inside: {
            parameter: /\s(--|-)\w+/m
        }
    },
    coord: /^@@.*@@$/m,
    deleted: /^-(?!-).+$/m,
    inserted: /^\+(?!\+).+$/m,
    commit_sha1: /^commit \w{40}$/m
};
! function() {
    function e(e, t) {
        return Array.prototype.slice.call((t || document).querySelectorAll(
            e))
    }

    function t(e, t) {
        return t = " " + t + " ", (" " + e.className + " ").replace(
            /[\n\t]/g, " ").indexOf(t) > -1
    }

    function n(e, n, r) {
        for (var i, a = n.replace(/\s+/g, "").split(","), l = +e.getAttribute(
            "data-line-offset") || 0, o = parseFloat(
            getComputedStyle(e).lineHeight), d = 0; i = a[d++];) {
            i = i.split("-");
            var c = +i[0],
                h = +i[1] || c,
                s = document.createElement("div");
            s.textContent = Array(h - c + 2).join(" \r\n"), s.className = (
                    r || "") + " line-highlight", t(e, "line-numbers") || (
                    s.setAttribute("data-start", c), h > c && s.setAttribute(
                        "data-end", h)), s.style.top = (c - l - 1) * o +
                "px", t(e, "line-numbers") ? e.appendChild(s) : (e.querySelector(
                    "code") || e).appendChild(s)
        }
    }

    function r() {
        var t = location.hash.slice(1);
        e(".temporary.line-highlight").forEach(function(e) {
            e.parentNode.removeChild(e)
        });
        var r = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
        if (r && !document.getElementById(t)) {
            var i = t.slice(0, t.lastIndexOf(".")),
                a = document.getElementById(i);
            a && (a.hasAttribute("data-line") || a.setAttribute("data-line",
                ""), n(a, r, "temporary "), document.querySelector(
                ".temporary.line-highlight").scrollIntoView())
        }
    }
    if (window.Prism) {
        var i = (crlf = /\r?\n|\r/g, 0);
        Prism.hooks.add("after-highlight", function(t) {
            var a = t.element.parentNode,
                l = a && a.getAttribute("data-line");
            a && l && /pre/i.test(a.nodeName) && (clearTimeout(i), e(
                ".line-highlight", a).forEach(function(e) {
                e.parentNode.removeChild(e)
            }), n(a, l), i = setTimeout(r, 1))
        }), addEventListener("hashchange", r)
    }
}();;
Prism.hooks.add("after-highlight", function(e) {
    var n = e.element.parentNode;
    if (n && /pre/i.test(n.nodeName) && -1 !== n.className.indexOf(
        "line-numbers")) {
        var t, a = 1 + e.code.split("\n").length;
        lines = new Array(a), lines = lines.join("<span></span>"), t =
            document.createElement("span"), t.className =
            "line-numbers-rows", t.innerHTML = lines, n.hasAttribute(
                "data-start") && (n.style.counterReset = "linenumber " +
                (parseInt(n.getAttribute("data-start"), 10) - 1)), e.element
            .appendChild(t)
    }
});;
! function() {
    if (self.Prism) {
        var i = /\b([a-z]{3,7}:\/\/|tel:)[\w-+%~/.:#=?&amp;]+/,
            n = /\b\S+@[\w.]+[a-z]{2}/,
            t = /\[([^\]]+)]\(([^)]+)\)/,
            e = ["comment", "url", "attr-value", "string"];
        for (var a in Prism.languages) {
            var r = Prism.languages[a];
            Prism.languages.DFS(r, function(a, r, l) {
                e.indexOf(l) > -1 && "Array" !== Prism.util.type(r) &&
                    (r.pattern || (r = this[a] = {
                            pattern: r
                        }), r.inside = r.inside || {}, "comment" == l &&
                        (r.inside["md-link"] = t), "attr-value" == l ?
                        Prism.languages.insertBefore("inside",
                            "punctuation", {
                                "url-link": i
                            }, r) : r.inside["url-link"] = i, r.inside[
                            "email-link"] = n)
            }), r["url-link"] = i, r["email-link"] = n
        }
        Prism.hooks.add("wrap", function(i) {
            if (/-link$/.test(i.type)) {
                i.tag = "a";
                var n = i.content;
                if ("email-link" == i.type && 0 != n.indexOf("mailto:"))
                    n = "mailto:" + n;
                else if ("md-link" == i.type) {
                    var e = i.content.match(t);
                    n = e[2], i.content = e[1]
                }
                i.attributes.href = n
            }
        })
    }
}();;
! function() {
    if (self.Prism && self.document && document.querySelector) {
        var t = {
            js: "javascript",
            html: "markup",
            svg: "markup",
            xml: "markup",
            py: "python",
            rb: "ruby"
        };
        Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(
            function(e) {
                var n = e.getAttribute("data-src"),
                    r = (n.match(/\.(\w+)$/) || [, ""])[1],
                    a = t[r] || r,
                    s = document.createElement("code");
                s.className = "language-" + a, e.textContent = "", s.textContent =
                    "Loadingâ€¦", e.appendChild(s);
                var o = new XMLHttpRequest;
                o.open("GET", n, !0), o.onreadystatechange = function() {
                    4 == o.readyState && (o.status < 400 && o.responseText ?
                        (s.textContent = o.responseText, Prism.highlightElement(
                            s)) : s.textContent = o.status >= 400 ?
                        "âœ– Error " + o.status +
                        " while fetching file: " + o.statusText :
                        "âœ– Error: File does not exist or is empty"
                    )
                }, o.send(null)
            })
    }
}();;
! function() {
    if (self.Prism) {
        var a = {
            csharp: "C#",
            cpp: "C++"
        };
        Prism.hooks.add("before-highlight", function(e) {
            var t = a[e.language] || e.language;
            e.element.setAttribute("data-language", t)
        })
    }
}();;
