<template>
  <div
    class="flex flex-col items-center justify-center gap-12 pt-40 sm:pt-32 lg:flex-row lg:items-start lg:gap-0"
  >
    <CheckoutForm :formData="formData" :errors="errors" @update:formData="updateFormData" />
    <CartSummary
      :cartItems="cartItems"
      :totalPrice="totalPrice"
      :formattedPrice="formattedPrice"
      :handleSubmit="handleSubmit"
      :removeFromCart="removeFromCart"
    />
    <Modal :isOpen="showModal" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { usePriceFormatter } from '../composables/usePriceFormatter'
import { computed } from 'vue'
import { useStore } from 'vuex'
import CheckoutForm from '../components/CheckoutForm.vue'
import CartSummary from '../components/CartSummary.vue'
import Modal from '../components/ConfirmModal.vue'

export default {
  name: 'CheckoutView',
  components: { CheckoutForm, CartSummary, Modal },
  mounted() {
    document.title = 'Checkout'
  },
  data() {
    return {
      formData: {
        nome: '',
        celular: '',
        cpf: '',
        email: '',
        cep: '',
        endereco: '',
        estado: '',
        cidade: ''
      },
      errors: {
        nome: '',
        celular: '',
        cpf: '',
        email: '',
        cep: '',
        endereco: '',
        estado: '',
        cidade: ''
      }
    }
  },
  methods: {
    updateFormData(newFormData) {
      this.formData = newFormData
    },
    validateField(field) {
      const value = this.formData[field]
      let message = ''

      switch (field) {
        case 'nome':
          if (!value.trim()) message = 'Nome é obrigatório'
          break
        case 'celular':
          if (!value) message = 'Celular é obrigatório'
          if (value.replace(/\D/g, '').length !== 11) message = 'Celular inválido'
          break
        case 'cpf':
          if (!value) message = 'CPF é obrigatório'
          if (value.replace(/\D/g, '').length !== 11) message = 'CPF inválido'
          break
        case 'email':
          if (!value) message = 'E-mail é obrigatório'
          if (!/\S+@\S+\.\S+/.test(value)) message = 'E-mail inválido'
          break
        case 'cep':
          if (!value) message = 'CEP é obrigatório'
          if (value.replace(/\D/g, '').length !== 8) message = 'CEP inválido'
          break
        case 'endereco':
          if (!value.trim()) message = 'Endereço é obrigatório'
          break
        case 'estado':
          if (!value) message = 'Estado é obrigatório'
          break
        case 'cidade':
          if (!value.trim()) message = 'Cidade é obrigatória'
          break
      }

      this.errors[field] = message
      return !message
    },
    handleSubmit() {
      if (this.cartItems.length === 0) {
        alert('O carrinho não pode estar vazio!')
        return
      }

      let isValid = true

      Object.keys(this.formData).forEach((field) => {
        const valid = this.validateField(field)
        if (!valid) isValid = false
      })

      if (isValid) {
        const cleanData = {
          ...this.formData,
          celular: this.formData.celular.replace(/\D/g, ''),
          cpf: this.formData.cpf.replace(/\D/g, ''),
          cep: this.formData.cep.replace(/\D/g, '')
        }
        console.log('Dados do formulário:', cleanData)

        this.formData = {
          nome: '',
          celular: '',
          cpf: '',
          email: '',
          cep: '',
          endereco: '',
          estado: '',
          cidade: ''
        }

        this.showModal = true
      }
    }
  },
  setup() {
    const store = useStore()
    const { formattedPrice } = usePriceFormatter()
    const showModal = ref(false)

    return {
      cartItems: computed(() => store.getters.cartItems),
      removeFromCart: (title) => store.commit('REMOVE_FROM_CART', title),
      totalPrice: computed(() => store.getters.totalPrice),
      formattedPrice,
      showModal
    }
  }
}
</script>
