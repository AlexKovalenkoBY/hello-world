'use strict'
const express = require('express')
const fs = require('fs')
const path = require('path')
const server = express()
const jsonParser = express.json()
const fullPath = path.join(__dirname, '/public')

server.use(express.static(fullPath)) // ))__dirname + '/public'))
const compression = require('compression')



// db.sequelize
//   .sync({ force: false })
//   .then(() => console.log('Ура! Связь с БД установлена.... '))




server.use(compression())
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')

  res.header('Access-Control-Allow-Headers', '*')
  next()
}
server.use(allowCrossDomain)

// const filePath = '/users.json'


server.get('/', function (req, res) {

  res.sendFile('index.html', { root: __dirname })
})
server.get('/api/one', function (req, res) {

  res.sendFile('C:\\aris\\sharefld\\analitica.json')
})
server.get('/api/for_pzk', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\for_PZK.json')
})
server.get('/analitics.html', function (req, res) {
  res.sendFile('analitics.html', { root: __dirname })
})
server.get('/form.html', function (req, res) {
  res.sendFile('form.html', { root: __dirname })
})
server.get('/tree.html', function (req, res) {
  res.sendFile('tree.html', { root: __dirname })
})
server.get('/api/bpcount', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\bpcount.txt')
})
server.get('api/getallppid/', function (req, res) {
  var fs = require('fs')
  var contents = fs.readFileSync('C:\\aris\\sharefld\\DataTreeSubBP.json')
  var jsonContent = JSON.parse(contents, function (k, v) {
    console.log(k) // пишем имя текущего свойства, последним именем будет ""
    return v // возвращаем неизменённое значение свойства
  })

  res.send(jsonContent)
})
server.get('/api/getallbp', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\DataTreeBP.json')
})
server.get('/api/getMD', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\ModelTree.json')
})
server.get('/api/pasports', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\pasports.json')
})

server.get('/api/orgStrCBURD', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\orgStrCBURD.json')
})
server.get('/api/orgStrCSBO', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\orgStrCSBO.json')
})
server.get('/api/orgStrCA', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\orgStrCA.json')
})

server.get('/api/getallpp', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\DataTreeSubBP.json')
})
server.get('/api/BpOwnExps', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\BpOwnExps.json')
})
server.get('/api/PZK_TREE', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\BIGtree.json')
})

server.get('/api/BP_PP_TREE', function (req, res) {
  res.sendFile('C:\\aris\\ArisApi\\public\\BIGsubBBandPP.json')
})

server.get('/api/PPExps', function (req, res) {
  res.sendFile('C:\\aris\\sharefld\\PPExps.json')
})

server.get('/api/getbpandpp2', async function (req, res) {
  console.time('Begintime_API_getbpandpp2')

  const files = ['C:\\aris\\sharefld\\DataTreeBP.json',
    'C:\\aris\\sharefld\\DataTreeSubBP.json',
    'C:\\aris\\sharefld\\analitica.json',
    'C:\\aris\\sharefld\\BpOwnExps.json'
  ]
  const getFile = (fileName) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
          reject(err) // calling `reject` will cause the promise to fail with or without the error passed as an argument
          return // and we don't want to go any further
        }
        resolve(JSON.parse(data))
      })
    })
  }

  let bpcontent = null
  let ppcontent = null
  let analitica = null
  let BpOwnExps = null
  const filesContentArray = await Promise.all([getFile(files[0]), getFile(files[1]), getFile(files[2]), getFile(files[3])]).catch(function (err) {
    res.send(err.message)
  })
  bpcontent = filesContentArray[0]
  ppcontent = filesContentArray[1]
  analitica = filesContentArray[2]
  BpOwnExps = filesContentArray[3]
  let analitic = ''
  let ownerpos = null
  let bp = null
  let pptemp = null
  let iso = null
  let experts = null
  for (let i = 0; i < bpcontent.length; i++) {
    bp = bpcontent[i]
    analitic = analitica.filter(an => {
      return an.bpid === bp.bpid
    }).map(function (obj) { return obj.analitic })

    iso = analitica.filter(an => {
      return an.bpid === bp.bpid
    }).map(function (obj) { return obj.iso })

    ownerpos = analitica.filter(an => {
      return an.ownercode === bp.bpowner
    }).map(function (obj) { return obj.owner })
    experts = BpOwnExps.filter(exp => {
      return exp.bpid === bp.bpid
    }).map(function (obj) { return obj.experts })
    bp.analitic = analitic[0]
    bp.iso = iso[0]
    bp.experts = experts[0]
    bp.ownerpos = ownerpos[0]
    pptemp = ppcontent.filter((pp) => {
      return pp.bpid == bp.bpid
    })
    for (let j = 0; j < pptemp.length; j++) {
      pptemp[j].bpownerpos = bp.ownerpos
      pptemp[j].analitic = bp.analitic
      pptemp[j].bpnum = bp.bpnum
    }
  }

  res.send([bpcontent, ppcontent])
  console.timeEnd('Begintime_API_getbpandpp2')
})
server.get('/api/getbpandpp', async function (req, res) {
  console.time('Begintime_API_getbpandpp')
  const files = ['C:\\aris\\sharefld\\DataTreeBP.json',
    'C:\\aris\\sharefld\\DataTreeSubBP.json',
    'C:\\aris\\sharefld\\BpOwnExps.json'
  ]
  const getFile = (fileName) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
          reject(err) // calling `reject` will cause the promise to fail with or without the error passed as an argument
          return // and we don't want to go any further
        }
        resolve(JSON.parse(data))
      })
    })
  }

  let bpcontent = null
  let ppcontent = null
  let bpOwnerContent = null

  const filesContentArray = await Promise.all([getFile(files[0]), getFile(files[1]), getFile(files[2])]).catch(function (err) {
    // dispatch a failure and throw error
    // throw err

    res.send(err.message)
  })

  bpcontent = filesContentArray[0]
  console.log(filesContentArray[0])
  ppcontent = filesContentArray[1]
  console.log(filesContentArray[1])
  bpOwnerContent = filesContentArray[2]
  console.log(filesContentArray[2])
  // const bpshort = bpcontent.map(function (bp) { return { bpid: bp.bpid, bpnum: bp.bpnum, bpname: bp.bpname, bpowner: bp.bpowner } })

  function TSH(s) {
    //  let s = obj.bpid;
    for (var i = 0, h = 9; i < s.length;) { h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9) }
    return h ^ h >>> 9
  }

  function mySortObjOccsByName(a, b) {
    var a1 = a.ppnum
    a1 = a1.split('.')

    var b1 = b.ppnum

    b1 = b1.split('.')
    for (var i = 0; i < a1.length; i++) {
      if (b1.length - 1 < i) {
        return 1
      } // b1 = 1.1. a1 =  1.1.1.
      if (a1[i] === b1[i]) {
        continue
      }
      return a1[i] - b1[i]
    }
    return 0
  }

  const bphash = {}
  console.time('Hashtime')
  const bppparray = []
  let ppsubarray = []
  let bpOwnername = []
  bpcontent.forEach(function (bp) {
    bphash[bp.bpid] = TSH(bp.bpid)
    ppsubarray = ppcontent.filter(function (pp) {
      return pp.bpid === bp.bpid
    })
    bpOwnername = bpOwnerContent.filter(function (owner) {
      if (owner.bpid === bp.bpid) return owner
    })
    ppsubarray = ppsubarray.sort(mySortObjOccsByName)
    bppparray.push({
      bpid: bp.bpid,
      bpnum: bp.bpnum,
      bpname: bp.bpname,
      bpownerName: bpOwnername[0],
      pparray: ppsubarray
    }

    )
  })
  console.timeEnd('Hashtime')

  res.send(bppparray)
  console.timeEnd('Begintime_API_getbpandpp')

})

server.get('/api/test', async function (req, res) {
  console.time('test')
  const files = ['C:\\aris\\sharefld\\analitica.json',
    'C:\\aris\\sharefld\\DataTreeSubBP.json'
  ]
  const getFile = (fileName) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
          reject(err) // calling `reject` will cause the promise to fail with or without the error passed as an argument
          return // and we don't want to go any further
        }
        resolve(JSON.parse(data))
      })
    })
  }

  let bpcontent = null
  let ppcontent = null

  const filesContentArray = await Promise.all([getFile(files[0]), getFile(files[1])]).catch(function (err) {
    // dispatch a failure and throw error
    // throw err

    res.send(err.message)
  })

  bpcontent = filesContentArray[0]
  console.log(filesContentArray[0])
  ppcontent = filesContentArray[1]
  console.log(filesContentArray[1])
  // const bpshort = bpcontent.map(function (bp) { return { bpid: bp.bpid, bpnum: bp.bpnum, bpname: bp.bpname, bpowner: bp.bpowner } })

  function TSH(s) {
    //  let s = obj.bpid;
    for (var i = 0, h = 9; i < s.length;) { h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9) }
    return h ^ h >>> 9
  }

  function mySortObjOccsByName(a, b) {
    var a1 = a.ppnum
    a1 = a1.split('.')

    var b1 = b.ppnum

    b1 = b1.split('.')
    for (var i = 0; i < a1.length; i++) {
      if (b1.length - 1 < i) {
        return 1
      } // b1 = 1.1. a1 =  1.1.1.
      if (a1[i] === b1[i]) {
        continue
      }
      return a1[i] - b1[i]
    }
    return 0
  }

  const bphash = {}
  console.time('Hashtime')
  const bppparray = []
  let ppsubarray = []
  bpcontent.forEach(function (bp) {
    bphash[bp.bpid] = TSH(bp.bpid)
    ppsubarray = ppcontent.filter(function (pp) {
      return pp.bpid === bp.bpid
    })
    ppsubarray = ppsubarray.sort(mySortObjOccsByName)
    bppparray.push({
      bpid: bp.bpid,
      bpname: bp.bp,
      analitic: bp.analitic,
      owner: bp.owner,
      pparray: ppsubarray
    }

    )
  })
  console.timeEnd('Hashtime')

  res.send(bppparray)
  console.timeEnd('Begintime_API_getbpandpp')

})



server.listen(8888, function () {
  console.log('Сервер ожидает подключения.on port 8888..' + new Date())
})
