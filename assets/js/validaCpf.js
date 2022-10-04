// let cpf = '705.484.450-52' 070.987.720-03
class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable:false, // não pode escrever nela
            enumerable: true, // não vai aparecer
            configurable: false, // não pode ser configurada
            // validando qualquer coisa que não seja numero
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    verificaSequencia(){
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }


    geraNovoCpf(){
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfParcial);
        const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1);

        this.novoCpf = cpfParcial + digito1 + digito2;
    }


    static geraDigito(cpfParcial) {
        let total = 0;
        let reverso = cpfParcial.length + 1;

        for (let stringNum of cpfParcial){
            total += reverso * Number(stringNum);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }


    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.verificaSequencia()) return false;
        this.geraNovoCpf();

        return this.novoCpf === this.cpfLimpo;
    }
}

const validaCpf = new ValidaCPF('070.987.720-03');
console.log(validaCpf.valida());

if (validaCpf.valida()) {
    console.log('CPF valido')
}else {
    console.log('CPF invalido');
}