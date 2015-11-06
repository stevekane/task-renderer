'use strict';

var Sequence1 = {
    'className': 'Sequence',
    'assets': [{
        'className': 'TextLayoutAsset',
        'name': 'background',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 82.8,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': '#dff4fe',
                'padding': 0,
                'shadowColor': '#dfe7ee',
                'shadowSize': 24
            },
            'text': {
                'align': 'center',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 240,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': '',
        'textEditable': false,
        'time': 0,
        'type': 'background',
        'visualStates': [
            {
                'height': 1,
                'opacity': 0,
                'removable': false,
                'time': 0,
                'width': 1,
                'x': 0,
                'y': 0
            },
            {
                'height': 1,
                'opacity': 1,
                'removable': false,
                'time': 410,
                'width': 1,
                'x': 0,
                'y': 0
            },
            {
                'height': 1,
                'opacity': 1,
                'removable': false,
                'time': 5945,
                'width': 1,
                'x': 0,
                'y': 0
            },
            {
                'height': 1,
                'opacity': 0,
                'removable': false,
                'time': 6355,
                'width': 1,
                'x': 0,
                'y': 0
            }
        ],
        'zIndex': 0
    },
    {
        'className': 'TextLayoutAsset',
        'name': 'header box',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 0,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': 'transparent',
                'padding': 0,
                'shadowColor': '#000000',
                'shadowSize': 0
            },
            'text': {
                'align': 'left',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 73,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': '',
        'textEditable': false,
        'time': 0,
        'type': 'head',
        'visualStates': [
            {
                'height': 0.08,
                'opacity': 0,
                'removable': false,
                'time': 0,
                'width': 0.67,
                'x': 0.1,
                'y': 0.33
            },
            {
                'height': 0.08,
                'opacity': 1,
                'removable': false,
                'time': 410,
                'width': 0.67,
                'x': 0.1,
                'y': 0.33
            },
            {
                'height': 0.08,
                'opacity': 1,
                'removable': false,
                'time': 5945,
                'width': 0.67,
                'x': 0.1,
                'y': 0.33
            },
            {
                'height': 0.08,
                'opacity': 0,
                'removable': false,
                'time': 6355,
                'width': 0.67,
                'x': 0.1,
                'y': 0.33
            }
        ],
        'zIndex': 1
    },
    {
        'className': 'TextLayoutAsset',
        'name': 'header',
        'staticStyle': {
            'border': {
                'color': 'transparent',
                'radius': 0,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': '#ff00ff',
                'padding': 0,
                'shadowColor': 'transparent',
                'shadowSize': 0
            },
            'text': {
                'align': 'left',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 240,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': 'Colonoscopy',
        'textEditable': true,
        'time': 0,
        'type': 'head',
        'visualStates': [
            {
                'height': 0.08,
                'opacity': 0,
                'removable': false,
                'time': 0,
                'width': 0.67,
                'x': 0.10155884645362433,
                'y': 0.3216897506925208
            },
            {
                'height': 0.08,
                'opacity': 1,
                'removable': false,
                'time': 410,
                'width': 0.67,
                'x': 0.10155884645362433,
                'y': 0.3216897506925208
            },
            {
                'time': 3000,
                'height': 0.16,
                'opacity': 1,
                'removable': false,
                'width': 0.67,
                'x': 1,
                'y': 0.3216897506925208

            },
            {
                'height': 0.08,
                'opacity': 1,
                'removable': false,
                'time': 5945,
                'width': 0.67,
                'x': 0.10155884645362433,
                'y': 0.3216897506925208
            },
            {
                'height': 0.08,
                'opacity': 0,
                'removable': false,
                'time': 6355,
                'width': 0.67,
                'x': 0.10155884645362433,
                'y': 0.3216897506925208
            }
        ],
        'zIndex': 3
    },
    {
        'className': 'TextLayoutAsset',
        'name': 'content box',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 32,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': '#ffffff',
                'padding': 160,
                'shadowColor': '#dbedfa',
                'shadowSize': 24
            },
            'text': {
                'align': 'left',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 160,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': '',
        'textEditable': false,
        'time': 0,
        'type': 'box',
        'visualStates': [
            {
                'height': 0.4,
                'opacity': 0,
                'removable': false,
                'time': 0,
                'width': 0.67,
                'x': 0.1,
                'y': 0.42
            },
            {
                'height': 0.4,
                'opacity': 1,
                'removable': false,
                'time': 410,
                'width': 0.67,
                'x': 0.1,
                'y': 0.42
            },
            {
                'height': 0.4,
                'opacity': 1,
                'removable': false,
                'time': 5945,
                'width': 0.67,
                'x': 0.1,
                'y': 0.42
            },
            {
                'height': 0.4,
                'opacity': 0,
                'removable': false,
                'time': 6355,
                'width': 0.67,
                'x': 0.1,
                'y': 0.42
            }
        ],
        'zIndex': 2
    },
    {
        'className': 'TextLayoutAsset',
        'name': 'content',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 32,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': 'transparent',
                'padding': 160,
                'shadowColor': '#dbedfa',
                'shadowSize': 19
            },
            'text': {
                'align': 'left',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 160,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': 'The goal of a colonoscopy is to look for early signs of colon cancer or other problems.',
        'textEditable': true,
        'time': 0,
        'type': 'box',
        'visualStates': [
            {
                'height': 0.4,
                'opacity': 0,
                'removable': false,
                'time': 0,
                'width': 0.67,
                'x': 0.1,
                'y': 0.42
            },
            {
                'height': 0.4,
                'opacity': 1,
                'removable': false,
                'time': 410,
                'width': 0.67,
                'x': 0.1,
                'y': 0.42
            },
            {
                'height': 0.4,
                'opacity': 1,
                'removable': false,
                'time': 5945,
                'width': 0.67,
                'x': 0.1,
                'y': 0.42
            },
            {
                'height': 0.4,
                'opacity': 0,
                'removable': false,
                'time': 6355,
                'width': 0.67,
                'x': 0.1,
                'y': 0.42
            }
        ],
        'zIndex': 4
    },
    {
        'className': 'ImageAsset',
        'media': {
            'filename': 'emmi.png',
            'metadata': {
                'ratio': 0.717689863687609
            },
            'name': '2_04',
            'path': '',
            'type': 'image'
        },
        'name': 'New image',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 0,
                'style': 'none',
                'width': 0
            },
            'box': {
                'padding': 0,
                'shadowColor': '#000000',
                'shadowSize': 0
            },
            'text': {
                'align': 'left',
                'color': '#000000',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 73,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'time': 123,
        'type': null,
        'visualStates': [
            {
                'height': 0.36158313993520635,
                'opacity': 0,
                'removable': false,
                'time': 13,
                'width': 0.26000031949759184,
                'x': 0.72,
                'y': 0.1
            },
            {
                'height': 0.36158313993520635,
                'opacity': 1,
                'removable': false,
                'time': 492,
                'width': 0.26000031949759184,
                'x': 0.72,
                'y': 0.1
            },
            {
                'height': 0.36158313993520635,
                'opacity': 1,
                'removable': false,
                'time': 5781,
                'width': 0.26000031949759184,
                'x': 0.72,
                'y': 0.1
            },
            {
                'height': 0.36158313993520635,
                'opacity': 0,
                'removable': false,
                'time': 6232,
                'width': 0.26000031949759184,
                'x': 0.72,
                'y': 0.1
            }
        ],
        'zIndex': 5
    }],
    'name': null,
    'objectId': 1039,
    'parentObjectId': 1018,
    'screens': [{
        'rows': [ {
            'audioText': ' Now, as you may know, the goal of a colonoscopy is to look for early signs of colon cancer or other problems. &nbsp;',
            'endTime': 6370,
            'media': {
                'filename': 'media/audio/2_05.mp3',
                'metadata': {
                    'duration': 6370,
                    'text': ''
                },
                'name': '2_04',
                'path': '',
                'type': 'audio'
            },
            'startTime': 6790,
            'wait': 420
        },{
                'audioText': ' Now, as you may know, the goal of a colonoscopy is to look for early signs of colon cancer or other problems. &nbsp;',
                'endTime': 6370,
                'media': {
                    'filename': 'media/audio/2_04.mp3',
                    'metadata': {
                        'duration': 6370,
                        'text': ''
                    },
                    'name': '2_04',
                    'path': '',
                    'type': 'audio'
                },
                'startTime': 0,
                'wait': 4200
        }
        ]
    }],
    'waitAfter': 0
};

export default Sequence1;
