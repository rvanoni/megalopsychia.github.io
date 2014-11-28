
var Money = 0;
var Respect = 0;

var MoneyRate = 1;

var WeaponsInventory = [0, 0, 0];
var WeaponsName      = ['Knife', 'Gun', 'Uzi'];
var WeaponsCost      = [20, 100, 200];
var WeaponsBonus     = [0.5, 2, 5];
var WeaponsCostRate = 1.15;

var EmployeesInventory = [0, 0, 0];
var EmployeesName = ['Carlos', 'Juan', 'Pepe'];
var EmployeesCost = [1000, 1500, 2500];
var EmployeesStealRate = [0.5, 0.7, 1.0];
var EmployeesRespectBonus = [10, 15, 30];
var EmployeesLimitQuantity = [3, 3, 1];
var EmployeesCostRate = 1.25;
var EmployeesStealRateBonus = 0;
var EmployeeCap = 5;

var OrgInventory = [0, 0, 0, 0];
var OrgNames = ['Base', 'Building', 'Car', 'Blinded Truck'];
var OrgCost = [10000, 150000, 9500, 450000];
var OrgBonus = ['Raises Employee Cap', 'Raises more the employee cap', 'Your employees steal faster', 'Your employees steal even faster']
var OrgBonusRate = [5, 25, 0.5, 2]
var OrgCostRate = 1.4;

var OrgTabEnabled = false;
var ShopTabEnabled = false;
var EmployeeTabEnabled = false;

function OnLoad()
{
    setInterval(Refresh, 500);

    HideTab('Shop');
    HideTab('Employees');
    HideTab('Organization');

    SetMessage('MainMje', 'You are a low-level thief, cant really steal from others than homeless and old people.');
    SetMessage('MainSubMje', 'Do you really wanna steal from those poor people?');
}
function BuyWeapon(id)
{
    if (parseInt(Money) >= parseInt(WeaponsCost[id]))
    {
        Money = parseInt(Money) - parseInt(WeaponsCost[id]);
        WeaponsInventory[id]++;
        MoneyRate += WeaponsBonus[id];
        WeaponsCost[id] = (parseInt(WeaponsCost[id]) * WeaponsCostRate).toFixed(2);
        Refresh();

        if (WeaponsName[id] == 'Uzi' && !EmployeeTabEnabled)
        {
            SetMessage('ShopMje', 'Wow, you got a big weapon right there.');
            SetMessage('ShopSubMje', 'Maybe you should consider hiring people to do the dirty job for you.');
            ShowTab('Employees');

            SetMessage('EmployeesMje', 'Employees steal for you at a fixed rate over time, depending on your steal rate.');
            SetMessage('EmployeesSubMje', 'The more employees you have, the more powerful you get.');
            EmployeeTabEnabled = true;
            
        }
    }
}
function HireEmployee(id)
{
    if (Money >= EmployeesCost[id] && EmployeesInventory[id] < EmployeeCap)
    {
        Money -= EmployeesCost[id];
        EmployeesCost[id] *= EmployeesCostRate;
        EmployeesInventory[id]++;
        EmployeesStealRateBonus += EmployeesStealRate[id];
        Respect += EmployeesRespectBonus[id];
        EmployeesStealRate[id] /= EmployeesCostRate;

        Refresh();

        if (Respect >= 50 && !OrgTabEnabled)
        {
            alert('Congratulations! You have founded your own Crime Organization!');
            ShowTab('Organization');

            SetMessage('OrganizationMje', 'This is your own organization, where stuff happens.');
            SetMessage('OrganizationSubMje', 'But be careful, you can get arrested now.');

            SetMessage('MainMje', 'You dont really have a need to steal on your own now.');
            SetMessage('MainSubMje', 'Do you?');

            SetMessage('ShopMje', 'Buy stuff for your employees.');
            SetMessage('ShopSubMje', 'The better weapons they have, the more money you get.');

            OrgTabEnabled = true;
        }
    }
}
function RefreshWeaponsTable()
{
    var table = document.getElementById('WeaponsTable');

    if (table.rows.length > 0)
    {
        var i = table.rows.length -1;

        while (i > 0)
        {
            table.deleteRow(i);
            i--;
        }
    }

    for (var i = 0; i < WeaponsName.length; i++)
    {
        var row = table.insertRow(table.rows.length);

        var cell = row.insertCell(0);
        cell.innerText = WeaponsName[i];

        var cell1 = row.insertCell(1);
        cell1.innerText = WeaponsCost[i];

        var cell2 = row.insertCell(2);
        cell2.innerText = 'Steal Money +$' + WeaponsBonus[i];

        var cell3 = row.insertCell(3);
        var btn = document.createElement('Button');
        btn.setAttribute('onclick', 'BuyWeapon(' + i + ')');
        var t = document.createTextNode("Buy");
        btn.appendChild(t);
        cell3.appendChild(btn);

        var cell4 = row.insertCell(4);
        cell4.innerText = WeaponsInventory[i];
    }
}
function RefreshEmployeesTable()
{
    var table = document.getElementById('EmployeesTable');

    if (table.rows.length > 0) {
        var i = table.rows.length - 1;

        while (i > 0) {
            table.deleteRow(i);
            i--;
        }
    }

    for (var i = 0; i < EmployeesName.length; i++)
    {
        
        var row = table.insertRow(table.rows.length);

        var cell = row.insertCell(0);
        cell.innerText = EmployeesName[i];

        var cell1 = row.insertCell(1);
        cell1.innerText = EmployeesCost[i].toFixed(2);

        var cell2 = row.insertCell(2);
        cell2.innerText = 'Steal Money *' + EmployeesStealRate[i].toFixed(3);

        var cell2 = row.insertCell(3);
        cell2.innerText = '+' + EmployeesRespectBonus[i];

        var cell4 = row.insertCell(4);
        var btn = document.createElement('Button');
        btn.setAttribute('onclick', 'HireEmployee(' + i + ')');
        var t = document.createTextNode("Hire");
        btn.appendChild(t);
        cell4.appendChild(btn);

        var cell5 = row.insertCell(5);
        cell5.innerText = EmployeesInventory[i] + '/' + EmployeeCap;
    }
}
function RefreshOrganizationTable() {
    var table = document.getElementById('OrganizationTable');

    if (table.rows.length > 0) {
        var i = table.rows.length - 1;

        while (i > 0) {
            table.deleteRow(i);
            i--;
        }
    }

    for (var i = 0; i < OrgNames.length; i++) {

        var row = table.insertRow(table.rows.length);

        var cell = row.insertCell(0);
        cell.innerText = OrgNames[i];

        var cell1 = row.insertCell(1);
        cell1.innerText = OrgCost[i].toFixed(2);

        var cell2 = row.insertCell(2);
        cell2.innerText = OrgBonus[i] + ' ' + OrgBonusRate[i].toFixed(3);

        var cell3 = row.insertCell(3);
        var btn = document.createElement('Button');
        btn.setAttribute('onclick', 'BuyOrgItem(' + i + ')');
        var t = document.createTextNode("Buy");
        btn.appendChild(t);
        cell3.appendChild(btn);

        var cell4 = row.insertCell(4);
        cell4.innerText = OrgInventory[i];
    }
}
function BuyOrgItem(id)
{

}
function GetMoney()
{
    Money += MoneyRate;

    Refresh();

    if (parseInt(Money) >= 10 && !ShopTabEnabled)
    {
        SetMessage('MainMje', 'Boy, you are really stealing from them.');
        SetMessage('MainSubMje', 'f');
    }

    if (parseInt(Money) >= 15 && !ShopTabEnabled)
    {
        SetMessage('MainMje', 'While you were stealing, you discovered an underground old shop.');
        SetMessage('MainSubMje', 'Go check it out.');
        ShowTab('Shop');
        ShopTabEnabled = true;
    }
}
function Refresh()
{
    Money += (MoneyRate * EmployeesStealRateBonus) / 2;

    var div = document.getElementById('currentMoney');
    div.innerText = 'Current Money: $' + Money.toFixed(2);

    var div = document.getElementById('currentMoneyRate');
    div.innerText = 'Money Steal Rate: +$' + MoneyRate.toFixed(2) + ' per steal.';

    if (EmployeeTabEnabled)
    {
        var div = document.getElementById('MoneyPerSec');
        div.innerText = 'Money per second: +$' + (MoneyRate * EmployeesStealRateBonus).toFixed(3);

        var div = document.getElementById('currentRespect');
        div.innerText = 'Respect: ' + Respect;
    }

    RefreshWeaponsTable();
    RefreshEmployeesTable();
    RefreshOrganizationTable();
}
function SetMessage(id, mje)
{
    var mj1 = document.getElementById(id);
    mj1.innerText = mje;
}
function HideTab(id)
{
    var div = document.getElementById(id);
    div.style.display = 'none';
}
function ShowTab(id)
{
    var div = document.getElementById(id);
    div.style.display = 'block';
}
