//using ModernWebStore.Domain.Services;
//using ModernWebStore.Infra.Persistence;
//using System;
//using System.Collections.Generic;
//using ModernWebStore.Domain.Entities;
//using ModernWebStore.Domain.Repositories;

//namespace ModernWebStore.ApplicationService
//{
//    public class PessoaJuridicaApplicationService : ApplicationService, IPessoaJuridicaApplicationService
//    {
//        private IPessoaJuridicaRepository _repository;

//        public PessoaJuridicaApplicationService(IPessoaJuridicaRepository repository, IUnitOfWork unitOfWork) : base(unitOfWork)
//        {
//            this._repository = repository;
//        }

//        public PessoaJuridica Create(PessoaJuridica pj)
//        {
//            //pf.Register();
//            _repository.Create(pj);

//            if (Commit())
//                return pj;

//            return null;
//        }

//        public PessoaJuridica Delete(int id)
//        {
//            var pj = _repository.Get(id);
//            _repository.Delete(pj);

//            if (Commit())
//                return pj;

//            return null;
//        }

//        public List<PessoaJuridica> DeleteAlot(List<PessoaJuridica> pessoasjuridicas)
//        {
//            var listPJ = new List<PessoaJuridica>();
//            foreach (var pj in pessoasjuridicas)
//            {
//                var pjDelete = _repository.Get(pj.Id);
//                _repository.Delete(pjDelete);

//                if (Commit())
//                    listPJ.Add(pjDelete);
//                else
//                    return null;
//            }

//            return listPJ;
//        }

//        public List<PessoaJuridica> Get()
//        {
//            return _repository.Get();
//        }

//        public PessoaJuridica Get(int id)
//        {
//            return _repository.Get(id);
//        }

//        public List<PessoaJuridica> Get(int skip, int take)
//        {
//            return _repository.Get(skip, take);
//        }

//        public PessoaJuridica Update(PessoaJuridica pj)
//        {
//            //pf.Register();
//            _repository.Update(pj);

//            if (Commit())
//                return pj;

//            return null;
//        }
//    }
//}



