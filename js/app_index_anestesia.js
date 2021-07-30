$(function(){

    $('#apre').on('click', function(){
        activeButton(true, false, false);
        activeClass('apre');
        deactiveClass('aintra');
        deactiveClass('apost');
        $('#contenedor').html('<h5>Pre ANESTESIA</h5>');
    });

    $('#aintra').on('click', function(){
        activeButton(false, true, false);
        activeClass('aintra');
        deactiveClass('apre');
        deactiveClass('apost');
        $('#contenedor').html('<h5>Intra ANESTESIA</h5>');
    });

    $('#apost').on('click', function(){
        activeButton(false, false, true);
        activeClass('apost');
        deactiveClass('aintra');
        deactiveClass('apre');
        $('#contenedor').html('<h5>Post ANESTESIA</h5>');
    });

    activeSavedState();

});

const activeButton = (pre, intra, pos) => {
    if(pre && !intra && !pos){
        setMemoricedSelected("t", "", "");
    } else if(!pre && intra && !pos) {
        setMemoricedSelected("", "t", "");
    } else if(!pre && !intra && pos) {
        setMemoricedSelected("", "", "t");
    }
}

const setMemoricedSelected = (pre, intra, pos) => {
    sessionStorage.setItem("pre", pre);
    sessionStorage.setItem("intra", intra);
    sessionStorage.setItem("pos", pos);
}

const getSavedState = () => {
    return {
        pre: sessionStorage.getItem("pre") ? true : false
        , intra: sessionStorage.getItem("intra") ? true : false
        , pos: sessionStorage.getItem("pos") ? true : false
    }
}

const activeSavedState = () => {
    const { pre, intra, pos } = getSavedState();
    if(pre && !intra && !pos){
        $("#apre").trigger('click');
        activeClass('apre');
        deactiveClass('aintra');
        deactiveClass('apost');
    } else if(!pre && intra && !pos) {
        $("#aintra").trigger('click');
        activeClass('aintra');
        deactiveClass('apre');
        deactiveClass('apost');
    } else if(!pre && !intra && pos) {
        $("#apost").trigger('click');
        activeClass('apost');
        deactiveClass('aintra');
        deactiveClass('apre');
    } else {
        $("#apre").trigger('click');
        activeClass('apre');
        deactiveClass('aintra');
        deactiveClass('apost');
    }
}

const activeClass = (id) => {
    if(!$(`#${id}`).hasClass('active')) {
        $(`#${id}`).addClass('active');
    }
}

const deactiveClass = (id) => {
    if($(`#${id}`).hasClass('active')) {
        $(`#${id}`).removeClass('active');
    }
}