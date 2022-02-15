$(function() {
    // var data = [
    //     {
    //         id: 0,
    //         text: 'enhancement'
    //     },
    //     {
    //         id: 1,
    //         text: 'bug'
    //     },
    //     {
    //         id: 2,
    //         text: 'duplicate'
    //     },
    //     {
    //         id: 3,
    //         text: 'invalid'
    //     },
    //     {
    //         id: 4,
    //         text: 'wontfix'
    //     }
    // ];

    var data = [
          { 
            "text": "Group 1", 
            "children" : [
              {
                  "id": 1,
                  "text": "Option 1.1"
              },
              {
                  "id": 2,
                  "text": "Option 1.2"
              }
            ]
          },
          { 
            "text": "Group 2", 
            "children" : [
              {
                  "id": 3,
                  "text": "Option 2.1"
              },
              {
                  "id": 4,
                  "text": "Option 2.2"
              }
            ]
          }
        ]
    
    $(".seleccion").select2({
        placeholder: 'Select an option',
        data: data,
        width: '10rem'
    })
});