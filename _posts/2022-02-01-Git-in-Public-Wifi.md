---
layout: posts
date: 2022-02-01
title: "Git in PUblic Wifi"
categories:
    - git
synopsis: Problems I faced while trying to use Git on Public Wifi and solution.
---

So recently ( well not recently, but it's ok ) when I moved to my hostel, I had to use the free public wifi.  It was kinda okayish and speed was just decent.  But there are huge problems with this kinda public wifi systems. 

There are so many restrictions.. ugh... I can't even use discord vc feature. I can't even join discord vc channels when I am using the wifi. I just want to know, why? Why is even this blocked? But this isn't the problem I want to discuss today. What I want to talk about is the problem of using Git in Public Wifi. 

> Git SSH doesn't work in public wifi

If you try doing anything with the git ssh while being on public wifi you wouldn't be able to anything at all.

*Why?*

Cause public wifi blocks non conventional ports and Git SSH uses exactly that. And as far as I remember, it uses port 20. Which isn't a convential port. So I wasn't able to do anything. 

Even when I wanted to use simple Git clone it would get stuck. I was frustrated. Though I quickly figured out that I could do the same clone when using https. 

I wanted to know what is happening actually so I used: 

```bash
GIT_CURL_VERBOSE=1 GIT_TRACE=1 git push origin main
```

I used `git push` as test command in my test directory. 

This quickly told me that the git was getting stuck in  ` run-command.c:654` 

I was getting this output:
```bash
15:32:33.849897 git.c:458               trace: built-in: git push origin main
15:32:33.850142 run-command.c:654       trace: run_command: unset GIT_PREFIX; ssh git@github.com 'git-receive-pack '\''amanasci/test.git'\'
```

### So Solution? 
As I told before, the problem was the port and when I searched for same I quickly found this solution. 

Put in your ~/.ssh/config

``` config
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
  #IdentityFile ~/path/to/key
```

And after this it works like charm. It forces SSH to use port 443 when on ssh.github.com.

---
So that's all for this post. I'll post something again if I find something fun and new. 
<br> <br>
Signing out<br>
amanasci ( The Demon in your nightmare? )