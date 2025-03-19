import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cerveza } from 'src/app/core/interfaces/cerveza';
import { CervezasService } from 'src/app/core/services/cervezas.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './reportes.component.html',
    standalone: false
})
export class ReportesComponent implements OnInit, OnDestroy {
    public cervezasService = inject(CervezasService);

    public listaCervezas: Cerveza[] = [];
    public barData: any;
    public pieData: any;
    public barOptions: any;
    public pieOptions: any;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initCharts();
        });
    }

    ngOnInit() {
        this.getAllCervezas();
    }

    public getAllCervezas() {
        this.cervezasService.GetAll("0", "0", "0", "0", true).subscribe((response) => {
            this.listaCervezas = response;
        })
    }

    // public groupByPlatform = (cervezas: Cerveza[]): any[] => {
    //     const groupCervezas = new Map<string, any>();

    //     cervezas.forEach(cerveza => {
    //         cerveza.cervezaPlataformas?.forEach(cervezaPlataforma => {
    //             const { id, nombre } = cervezaPlataforma.plataforma!;
    //             const key = `${nombre}`;

    //             if (groupCervezas.has(key)) {
    //                 groupCervezas.get(key)!.cantidad += 1;
    //             } else {
    //                 groupCervezas.set(key, { id, nombre, cantidad: 1 });
    //             }

    //         });
    //     });

    //     console.log(groupCervezas.values())
    //     return Array.from(groupCervezas.values());
    // };

    public initCharts() {
        //const cervezasAgrupados = this.groupByPlatform(this.listaCervezas);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        // const cervezasMapeados: any[] = cervezasAgrupados.map(obj => ({
        //     nombre: obj.nombre,
        //     cantidad: obj.cantidad
        // }));

        // this.barData = {
        //     labels: cervezasMapeados.map(cerveza => { return cerveza.nombre }),
        //     datasets: [
        //         {
        //             label: 'Cervezas',                    
        //             backgroundColor: [
        //                 documentStyle.getPropertyValue('--gray-800'),
        //                 documentStyle.getPropertyValue('--red-500'),
        //                 documentStyle.getPropertyValue('--blue-800'),
        //                 documentStyle.getPropertyValue('--yellow-500'),
        //                 documentStyle.getPropertyValue('--blue-300'),
        //                 documentStyle.getPropertyValue('--purple-500'),
        //                 documentStyle.getPropertyValue('--pink-500'),
        //                 documentStyle.getPropertyValue('--orange-500'),
        //                 documentStyle.getPropertyValue('--green-500')
        //             ],
        //             hoverBackgroundColor: [
        //                 documentStyle.getPropertyValue('--gray-900'),
        //                 documentStyle.getPropertyValue('--red-400'),
        //                 documentStyle.getPropertyValue('--blue-900'),
        //                 documentStyle.getPropertyValue('--yellow-400'),
        //                 documentStyle.getPropertyValue('--blue-400'),
        //                 documentStyle.getPropertyValue('--purple-400'),
        //                 documentStyle.getPropertyValue('--pink-400'),
        //                 documentStyle.getPropertyValue('--orange-400'),
        //                 documentStyle.getPropertyValue('--green-400')
        //             ],
        //             borderColor: documentStyle.getPropertyValue('--gray-100'),
        //             data: cervezasMapeados.map(cerveza => { return cerveza.cantidad })
        //         }
        //     ]
        // };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        // this.pieData = {
        //     labels: cervezasMapeados.map(cerveza => { return cerveza.nombre }),
        //     datasets: [
        //         {
        //             data: cervezasMapeados.map(cerveza => { return cerveza.cantidad }),
        //             backgroundColor: [
        //                 documentStyle.getPropertyValue('--gray-800'),
        //                 documentStyle.getPropertyValue('--red-500'),
        //                 documentStyle.getPropertyValue('--blue-800'),
        //                 documentStyle.getPropertyValue('--yellow-500'),
        //                 documentStyle.getPropertyValue('--blue-300'),
        //                 documentStyle.getPropertyValue('--purple-500'),
        //                 documentStyle.getPropertyValue('--pink-500'),
        //                 documentStyle.getPropertyValue('--orange-500'),
        //                 documentStyle.getPropertyValue('--green-500')
        //             ],
        //             hoverBackgroundColor: [
        //                 documentStyle.getPropertyValue('--gray-900'),
        //                 documentStyle.getPropertyValue('--red-400'),
        //                 documentStyle.getPropertyValue('--blue-900'),
        //                 documentStyle.getPropertyValue('--yellow-400'),
        //                 documentStyle.getPropertyValue('--blue-400'),
        //                 documentStyle.getPropertyValue('--purple-400'),
        //                 documentStyle.getPropertyValue('--pink-400'),
        //                 documentStyle.getPropertyValue('--orange-400'),
        //                 documentStyle.getPropertyValue('--green-400')
        //             ]
        //         }]
        // };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
