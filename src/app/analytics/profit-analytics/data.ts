import { ChartType } from './dashboard.model';

const revenueChart: ChartType = {
    chart: {
        height: 280,
        type: 'line',
        toolbar: {
            show: false,
        }
    },
    stroke: {
        width: [3,3,3,3],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '20%',
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    yaxis: [
        {
            seriesName:'Items'
        },
        {
            seriesName:'Items',
            show:false
        },
        {
            seriesName:'Revenue',
            opposite:true
        },
        {
            seriesName:'Revenue',
            show:false
        },

      ],
    colors: ['#5664d2', '#1cbb8c','#0000FF','#FFA500'],
};

const salesAnalytics: ChartType = {
    series: [42, 26, 15],
    chart: {
        height: 230,
        type: 'donut',
    },
    labels: ['Product A', 'Product B', 'Product C'],
    plotOptions: {
        pie: {
            donut: {
                size: '75%'
            }
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false,
    },
    colors: ['#5664d2', '#1cbb8c', '#eeb902'],
};

const sparklineEarning: ChartType = {
    series: [72],
    chart: {
        type: 'radialBar',
        wight: 60,
        height: 60,
        sparkline: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#5664d2'],
    stroke: {
        lineCap: 'round'
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '70%'
            },
            track: {
                margin: 0,
            },

            dataLabels: {
                show: false
            }
        }
    }
};

const sparklineMonthly: ChartType = {
    series: [65],
    chart: {
        type: 'radialBar',
        wight: 60,
        height: 60,
        sparkline: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#1cbb8c'],
    stroke: {
        lineCap: 'round'
    },
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '70%'
            },
            track: {
                margin: 0,
            },

            dataLabels: {
                show: false
            }
        }
    }
};

const chatData = [
    {
        id: 1,
        name: 'Frank Vickery',
        message: 'Hey! I am available',
        image: 'assets/images/users/avatar-2.jpg',
        time: '12:09'
    },
    {
        id: 2,
        align: 'right',
        name: 'Ricky Clark',
        message: 'Hi, How are you? What about our next meeting?',
        time: '10:02'
    },
    {
        text: 'Today'
    },
    {
        id: 3,
        name: 'Frank Vickery',
        message: 'Hello!',
        image: 'assets/images/users/avatar-2.jpg',
        time: '10:06'
    },
    {
        id: 4,
        name: 'Frank Vickery',
        message: '& Next meeting tomorrow 10.00AM',
        image: 'assets/images/users/avatar-2.jpg',
        time: '10:06'
    },
    {
        id: 5,
        align: 'right',
        name: 'Ricky Clark',
        message: 'Wow that\'s great',
        time: '10:07'
    }
];

const transactions = [
    {
        orderid: '#NZ1563',
        date: '28 Mar, 2020',
        billingname: 'Frank Dean',
        total: '$164',
        paymentstatus: 'Unpaid'
    },
    {
        orderid: '#NZ1564',
        date: '28 Mar, 2020',
        billingname: 'Eddy Torres',
        total: '$141',
        paymentstatus: 'Paid'
    },
    {
        orderid: '#NZ1565',
        date: '29 Mar, 2020',
        billingname: 'Jamison Clark',
        total: '$123',
        paymentstatus: 'Paid'
    },
    {
        orderid: '#NZ1566',
        date: '30 Mar, 2020',
        billingname: 'Jewel Buckley',
        total: '$112',
        paymentstatus: 'Paid'
    },
    {
        orderid: '#NZ1567',
        date: '31 Mar, 2020',
        billingname: 'Jeffrey Waltz',
        total: '$105',
        paymentstatus: 'Unpaid'
    },
    {
        orderid: '#NZ1568',
        date: '01 Apr, 2020',
        billingname: 'Jefferson Allen',
        total: '$160',
        paymentstatus: 'Chargeback'
    }
];

const statData = [
    {
        icon: 'ri-stack-line',
        title: 'Orders',
        value: '100'
    }, {
        icon: 'ri-store-2-line',
        title: 'Items',
        value: '150'
    }, {
        icon: 'ri-briefcase-4-line',
        title: 'Sales',
        value: 'PKR 30,000'
    }, {
        icon: 'ri-briefcase-4-line',
        title: 'Estimated Costs',
        value: 'PKR 15,000'
    }, {
        icon: 'ri-briefcase-4-line',
        title: 'Estimated Payout',
        value: 'PKR 25,000'
    }, {
        icon: 'ri-briefcase-4-line',
        title: 'Estimated Profit',
        value: 'PKR 10,000'
    }
];

export { revenueChart, salesAnalytics, sparklineEarning, sparklineMonthly, chatData, transactions, statData };
