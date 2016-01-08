var disqus_loaded = false;

function load_disqus()
{
    disqus_loaded = true;
    var disqus_shortname = 'pablodarocha';
    var disqus_title = 'Perguntas e Respostas - Jekyll';
    var disqus_url = '/perguntas-e-respostas-jekyll/';
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//pablodarocha' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    var ldr = document.getElementById('disqus_loader');
};
window.onscroll = function(e) {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800)) {
        //hit bottom of page
        if (disqus_loaded==false)
            load_disqus()
    }
};