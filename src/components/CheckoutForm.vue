<template>
  <div
    class="grid w-full flex-col items-start justify-center gap-2 px-4 md:w-2/5 md:gap-6 md:pl-0 md:pr-8"
  >
    <h2 class="text-3xl font-medium">Finalizar Compra</h2>

    <!-- Nome -->
    <div class="w-full">
      <input
        :value="formData.nome"
        @input="updateField('nome', $event.target.value)"
        type="text"
        class="block w-full rounded-sm border-2 border-gray-300 py-2 pl-4 shadow-sm outline-none"
        :class="{ 'border-red-500 placeholder:text-red-500': errors.nome }"
        placeholder="Nome Completo"
      />
      <span v-if="errors.nome" class="text-sm text-red-500">{{ errors.nome }}</span>
    </div>

    <div class="flex gap-2 md:gap-4">
      <!-- CPF -->
      <div>
        <input
          :value="formData.cpf"
          @input="updateField('cpf', $event.target.value)"
          v-mask="'###.###.###-##'"
          type="text"
          class="block w-full rounded-sm border-2 border-gray-300 py-2 pl-4 shadow-sm outline-none"
          placeholder="CPF"
          :class="{ 'border-red-500 placeholder:text-red-500': errors.cpf }"
        />
        <span v-if="errors.cpf" class="text-sm text-red-500">{{ errors.cpf }}</span>
      </div>
      <!-- Celular -->
      <div>
        <input
          :value="formData.celular"
          @input="updateField('celular', $event.target.value)"
          v-mask="'(##) #####-####'"
          type="tel"
          class="block w-full rounded-sm border-2 border-gray-300 py-2 pl-4 shadow-sm outline-none"
          placeholder="Celular"
          :class="{ 'border-red-500 placeholder:text-red-500': errors.celular }"
        />
        <span v-if="errors.celular" class="text-sm text-red-500">{{ errors.celular }}</span>
      </div>
    </div>

    <!-- Email -->
    <div class="w-full">
      <input
        :value="formData.email"
        @input="updateField('email', $event.target.value)"
        type="email"
        class="block w-full rounded-sm border-2 border-gray-300 py-2 pl-4 shadow-sm outline-none"
        placeholder="E-mail"
        :class="{ 'border-red-500 placeholder:text-red-500': errors.email }"
      />
      <span v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</span>
    </div>

    <div class="flex gap-2 md:gap-4">
      <!-- CEP -->
      <div>
        <input
          :value="formData.cep"
          @input="updateField('cep', $event.target.value)"
          v-mask="'#####-###'"
          type="text"
          class="block w-full rounded-sm border-2 border-gray-300 py-2 pl-4 shadow-sm outline-none"
          placeholder="CEP"
          :class="{ 'border-red-500 placeholder:text-red-500': errors.cep }"
        />
        <span v-if="errors.cep" class="text-sm text-red-500">{{ errors.cep }}</span>
      </div>

      <!-- Endereço -->
      <div class="w-3/4">
        <input
          :value="formData.endereco"
          @input="updateField('endereco', $event.target.value)"
          type="text"
          class="block w-full rounded-sm border-2 border-gray-300 py-2 pl-4 shadow-sm outline-none"
          placeholder="Endereço"
          :class="{ 'border-red-500 placeholder:text-red-500': errors.endereco }"
        />
        <span v-if="errors.endereco" class="text-sm text-red-500">{{ errors.endereco }}</span>
      </div>
    </div>

    <div class="flex gap-2 md:gap-4">
      <!-- Cidade -->
      <div>
        <input
          :value="formData.cidade"
          @input="updateField('cidade', $event.target.value)"
          type="text"
          class="block w-full rounded-sm border-2 border-gray-300 py-2 pl-4 shadow-sm outline-none"
          placeholder="Cidade"
          :class="{ 'border-red-500 placeholder:text-red-500': errors.cidade }"
        />
        <span v-if="errors.cidade" class="text-sm text-red-500">{{ errors.cidade }}</span>
      </div>

      <!-- Estado -->
      <div>
        <input
          :value="formData.estado"
          @input="updateField('estado', $event.target.value)"
          type="text"
          class="block w-full rounded-sm border-2 border-gray-300 py-2 pl-4 shadow-sm outline-none"
          placeholder="Estado"
          :class="{ 'border-red-500 placeholder:text-red-500': errors.estado }"
        />
        <span v-if="errors.estado" class="text-sm text-red-500">{{ errors.estado }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'CheckoutForm',
  directives: { mask },
  props: {
    formData: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateField(field, value) {
      this.$emit('update:formData', { ...this.formData, [field]: value })
    }
  }
}
</script>
