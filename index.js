var tmpStart = { x: 0, y: 0 };
var tmpStop = { x: 0, y: 0 };
var isDown = false;
var graphHeight = 10;

var tilesize = { w: 24, h: 24 }
var tiles = []

var container = $("#grid")
var hoverTile = $('<div class="tile hover"></tile>')
var tmpTile = $('<div class="tile tmpTile"></tile>')
container.append(hoverTile)
container.append(tmpTile)

var btnPick = $('#tile-pick');
var btnClear = $('#tile-clear');
var btnCreate = $('#tile-create');
var btnDiscard = $('#tile-discard');
var btnAddArea = $('#tile-add-area');

container.mousedown(handleMouseDown.bind(this));
container.mouseup(handleMouseUp.bind(this));
container.mousemove(_.throttle(handleMouseMove.bind(this), 16, { leading: true, trailing: true }));

btnCreate.click(createTile);
btnDiscard.click(hideTmpTile);
btnClear.click(clearAllTiles);
btnAddArea.click(addArea);

function handleMouseDown(ev) {
    isDown = true;
    hoverTile.addClass('clicked')
    tmpTile.addClass('dragged')
    tmpTile.css('width', 23)
    tmpTile.css('height', 23)
    tmpTile.css('left', container.offset().left + pos.t.x * tilesize.w + 1)
    tmpTile.css('top', container.offset().top + pos.t.y * tilesize.h + 1)
    pos = getPos(ev);
    setStart(pos.t.x, pos.t.y);
}
function handleMouseUp(ev) {
    isDown = false;
    hoverTile.removeClass('clicked')
    pos = getPos(ev);
    setStop(pos.t.x, pos.t.y);
}
function handleMouseMove(ev) {
    pos = getPos(ev);
    hoverTile.css('left', container.offset().left + pos.t.x * tilesize.w + 1)
    hoverTile.css('top', container.offset().top + pos.t.y * tilesize.h + 1)
    if (isDown) {
        tmpTile.css('left', container.offset().left + Math.min(pos.t.x, tmpStart.x) * tilesize.w + 1)
        tmpTile.css('top', container.offset().top + Math.min(pos.t.y, tmpStart.y) * tilesize.h + 1)
        tmpTile.css('width', 24 * (Math.abs(pos.t.x - tmpStart.x) + 1) - 1)
        tmpTile.css('height', 24 * (Math.abs(pos.t.y - tmpStart.y) + 1) - 1)
    }
}

function getPos(ev) {
    var parentOffset = container.offset();
    var pos = { x: ev.pageX - parentOffset.left, y: ev.pageY - parentOffset.top };
    pos.t = { x: Math.floor(pos.x / tilesize.w), y: Math.floor(pos.y / tilesize.h) };
    return pos;
}
function setStart(x, y) {
    tmpStart = { x: x, y: y };
}
function setStop(x, y) {
    tmpStop = { x: x, y: y };
}

function createTile() {
    var newTile = {};
    newTile.start = { x: Math.min(tmpStart.x, tmpStop.x), y: Math.min(tmpStart.y, tmpStop.y) };
    newTile.stop = { x: Math.max(tmpStart.x, tmpStop.x), y: Math.max(tmpStart.y, tmpStop.y) };
    newTile.layer = parseInt($('input[name="layer"]:checked').val());
    tiles.push(newTile);
    drawTile(newTile);
    hideTmpTile();
    calcJson();
}
function drawTile(tile) {
    var newTile = $('<div class="tile drawn"></div>');
    newTile.css('left', container.offset().left + tile.start.x * tilesize.w + 1)
    newTile.css('top', container.offset().top + tile.start.y * tilesize.h + 1)
    newTile.css('width', 24 * (Math.abs(tile.start.x - tile.stop.x) + 1) - 1)
    newTile.css('height', 24 * (Math.abs(tile.start.y - tile.stop.y) + 1) - 1)
    container.append(newTile)
}
function hideTmpTile() {
    tmpTile.removeClass('dragged')
}
function clearAllTiles() {
    $('.tile.drawn').remove();
    tiles = [];
    $('#json').text('');
}

function addArea() {
    graphHeight += 10;
    container.css('height', tilesize.h * graphHeight + 1)
    $('.tile.drawn').each(function (index, element) {
        var elem = $(element);
        var cTop = elem.offset().top + (tilesize.h * 10);
        elem.css('top', cTop);
        html = $('html');
        html.scrollTop(container.height() - html.scrollTop() + 1);
    });
    for (var i in tiles) {
        tiles[i].start.y += 10;
        tiles[i].stop.y += 10;
    }
}

function calcJson() {
    var convertedTiles = [];
    for (var i in tiles) {
        t = tiles[i];
        // Invert y
        var tmp1 = graphHeight - t.start.y - 1;
        var tmp2 = graphHeight - t.stop.y - 1;
        var yStart = Math.min(tmp1, tmp2);
        var yStop = Math.max(tmp1, tmp2);

        tile = [
            [t.start.x, yStart],
            [t.stop.x, yStop],
            1,
            t.layer,
            0
        ];
        convertedTiles.push(tile)
    }
    var tilesJson = JSON.stringify(convertedTiles);
    console.log(tilesJson);
    $('#json').text(tilesJson);
}

function loadTiles() {
    // Todo
}
