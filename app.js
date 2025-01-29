$(document).ready(function(){
    $("#submit").click(function(e){
        e.preventDefault();
    
        var input = $("#dob-input").val();
        var dob = new Date(input);
        save(dob);
        renderAgeLoop();
    });

    function save(dob)
    {
        localStorage.dob = dob.getTime();
    };

    function load()
    {
        var dob;
        if (dob = localStorage.getItem("dob"))
        {
            return new Date(parseInt(dob));
        }
        return -1;
    };

    function createWeeksGrid() {
        const weeksGrid = $("#weeks-grid");
        const totalWeeks = 52 * 80; // 80 years * 52 weeks

        for (let i = 0; i < totalWeeks; i++) {
            weeksGrid.append($('<div>').addClass('week future'));
        }
    }

    function updateWeeksGrid(dob) {
        const now = new Date();
        const weeksLived = Math.floor((now - dob) / (1000 * 60 * 60 * 24 * 7));
        
        $('#weeks-grid .week').each(function(index) {
            if (index < weeksLived) {
                $(this).removeClass('future').addClass('past');
            }
        });
    }

    function renderAgeLoop()
    {
        var dob = load();
        $("#choose").css("display", "none");
        $("#timer").css("display", "block");
        
        createWeeksGrid();

        setInterval(function(){
            var age = getAge(dob);
            $("#age").html(age.year + "<sup>." + age.ms + "</sup>");
            updateWeeksGrid(dob);
        }, 100);
    };

    function renderChoose()
    {
        $("#choose").css("display", "block");
    };

    function getAge(dob){
        var now       = new Date;
        var duration  = now - dob;
        var years     = duration / 31556900000;
        
        var majorMinor = years.toFixed(9).toString().split('.');
        
        return {
            "year": majorMinor[0],
            "ms": majorMinor[1]
        };
    };

    function main() {
        if (load() != -1)
        {
            renderAgeLoop();
        } else {
            renderChoose();
        }
    };
    main();
});