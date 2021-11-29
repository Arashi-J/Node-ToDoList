const Tarea = require("./tarea");

class Tareas {

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })


        return listado;
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {

            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {


        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${ i + 1 }.`.green;
            const { desc, completadoEn } = tarea;

            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);

        });

        // let i = 1;

        // for (let tarea of this.listadoArr) {

        //     let index = `${i}.`

        //     if (tarea.completadoEn) {
        //         console.log(`${ index.green } ${ tarea.desc } :: Completada`);

        //     } else {
        //         console.log(`${ index.red } ${ tarea.desc } :: Pendiente`);
        //     }

        //     i += 1;

        // }

    }


    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;

            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;


            if (completadas) {

                if (completadoEn) {
                    contador += 1;
                    console.log(`${ (contador.toString() + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${ (contador.toString() + '.').green } ${ desc } :: ${ estado }`);
                }
            }



        });


    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;;

            }

        });

    }

}



module.exports = Tareas;